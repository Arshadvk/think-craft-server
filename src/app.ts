import express, { Application } from "express";
import { Server } from "http";
import cors from "cors";
import path from "path";
import morgan from "morgan"; // Middleware to log incoming requests
import dotenv from "dotenv";
import { Socket } from "socket.io";

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

const io = require('socket.io') (server , {
    pingTimeout : 600000 , 
    cors : {
        origin : 'http://localhost:3000'
    } 
})

io.on('connection' , (socket : Socket) =>{

    console.log("Socket Connected" , socket.id);
    
})