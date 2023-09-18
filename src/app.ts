import express, { Application } from "express";
import { Server } from "http";
import cors from "cors";
import path from "path";
import morgan from "morgan"; // Middleware to log incoming requests
import dotenv from "dotenv";
import { Socket } from "socket.io";
import fileUpload from 'express-fileupload'
import connectDB from "./infra/database/dbConfig"
import adminRoute from "./interface/routes/admin";
import advisorRoute from "./interface/routes/advisor";
import reviewerRoute from "./interface/routes/reviewer";
import studentRoute from "./interface/routes/student";

const app: Application = express()

app.use(express.json())
// Enable CORS for all routes
app.use(cors())
app.use(morgan('dev'));
app.use(fileUpload({
    useTempFiles: true
}))

dotenv.config({ path: path.resolve(__dirname, '../.env') });

//mogodb connection
connectDB(process.env.MONGODB_CONNECTION_URL || "");

//setup routes
app.use('/admin', adminRoute)
app.use('/advisor', advisorRoute)
app.use('/reviewer', reviewerRoute)
app.use('/', studentRoute)

// port setting
const PORT: number = Number(4000 || process.env.PORT)
const server: Server = app.listen(4000, () => console.log(`server is runnin on port ${PORT}`))


/////////////////////////////////////////////////////////


const io=require('socket.io')(server , {
    pingTimeout:60000,
    cors:{
        origin:'https://think-craft.vercel.app/'
    }
})


const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket:Socket) => {
  console.log("Socket Connected," , socket.id);
  socket.on("room:join", (data) => {
    console.log('room:join')
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    console.log('user calling ')
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });






  socket.on("call:ended", ({ to }) => {
    io.to(to).emit("call:ended", { from: socket.id });
  
    // You can also clean up any resources related to the call here
  });
  


  socket.on("user:end", ({ to }) => {
    console.log('user:end')
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

