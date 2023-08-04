import express  from "express";
import { passwordCreation, studentProfileController } from "../controller/student/studentManagement";
import { studentLogin } from "../controller/student/studentLoginController";


const studentRoute = express.Router()

studentRoute.post('/login' ,studentLogin )
studentRoute.put('/setpassword', passwordCreation)
studentRoute.put('/edit-profile' , studentProfileController)
export default studentRoute