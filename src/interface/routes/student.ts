import express  from "express";
import { passwordCreation } from "../controller/student/studentManagement";
import { studentLogin } from "../controller/student/studentLoginController";


const studentRoute = express.Router()

studentRoute.post('/login' ,studentLogin )
studentRoute.put('/setpassword', passwordCreation)
studentRoute.put('/edit-profile' ,)
export default studentRoute