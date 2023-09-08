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
const dbConfig_1 = __importDefault(require("./infra/database/dbConfig"));
const admin_1 = __importDefault(require("./interface/routes/admin"));
const advisor_1 = __importDefault(require("./interface/routes/advisor"));
const reviewer_1 = __importDefault(require("./interface/routes/reviewer"));
const student_1 = __importDefault(require("./interface/routes/student"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
//mogodb connection
(0, dbConfig_1.default)(process.env.MONGODB_CONNECTION_URL || "");
//setup routes
app.use('/admin', admin_1.default);
app.use('/advisor', advisor_1.default);
app.use('/reviewer', reviewer_1.default);
app.use('/', student_1.default);
// port setting
const PORT = Number(4000 || process.env.PORT);
const server = app.listen(4000, () => console.log(`server is runnin on port ${PORT}`));
const io = require('socket.io')(server, {
    pingTimeout: 600000,
    cors: {
        origin: 'http://localhost:3000'
    }
});
io.on('connection', (socket) => {
    console.log("Socket Connected", socket.id);
});
