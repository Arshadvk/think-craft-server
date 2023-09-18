"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan")); // Middleware to log incoming requests
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const dbConfig_1 = __importDefault(require("./infra/database/dbConfig"));
const admin_js_1 = __importDefault(require("./interface/routes/admin.js"));
const advisor_js_1 = __importDefault(require("./interface/routes/advisor.js"));
const reviewer_js_1 = __importDefault(require("./interface/routes/reviewer.js"));
const student_js_1 = __importDefault(require("./interface/routes/student.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true
}));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
//mogodb connection
(0, dbConfig_1.default)(process.env.MONGODB_CONNECTION_URL || "");
//setup routes
app.use('/admin', admin_js_1.default);
app.use('/advisor', advisor_js_1.default);
app.use('/reviewer', reviewer_js_1.default);
app.use('/', student_js_1.default);
// port setting
const PORT = Number(4000 || process.env.PORT);
const server = app.listen(4000, () => console.log(`server is runnin on port ${PORT}`));
/////////////////////////////////////////////////////////
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
});
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
io.on("connection", (socket) => {
    console.log("Socket Connected,", socket.id);
    socket.on("room:join", (data) => {
        console.log('room:join');
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    });
    socket.on("user:call", ({ to, offer }) => {
        console.log('user calling ');
        io.to(to).emit("incomming:call", { from: socket.id, offer });
    });
    socket.on("call:ended", ({ to }) => {
        io.to(to).emit("call:ended", { from: socket.id });
        // You can also clean up any resources related to the call here
    });
    socket.on("user:end", ({ to }) => {
        console.log('user:end');
        io.to(to).emit("incomming:end", { from: socket.id });
    });
    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    });
    socket.on("peer:nego:needed", ({ to, offer }) => {
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });
    socket.on("peer:nego:done", ({ to, ans }) => {
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
});
