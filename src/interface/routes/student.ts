import express  from "express";
import { passwordCreation} from "../controller/student/studentManagement";
import { studentLogin } from "../controller/student/studentLoginController";
import { getStudentProfileController, studentProfileController } from "../controller/student/studentProfileController";
import StudentAuthenticateToken from "../middlewares/authMiddleware";


const studentRoute = express.Router()

studentRoute.post('/login' ,studentLogin )
studentRoute.put('/setpassword/:id', passwordCreation)
studentRoute.put('/edit-profile/:id' , studentProfileController)
studentRoute.get('/profile/:id' , getStudentProfileController)
export default studentRoute