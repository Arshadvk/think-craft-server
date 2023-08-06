import express  from "express";
import { passwordCreation} from "../controller/student/studentManagement";
import { studentLogin } from "../controller/student/studentLoginController";
import { getStudentProfileController, studentProfileController } from "../controller/student/studentProfileController";
import StudentAuthenticateToken from "../middlewares/authMiddleware";


const studentRoute = express.Router()

studentRoute.post('/login' ,studentLogin )
studentRoute.put('/setpassword', passwordCreation)
studentRoute.put('/edit-profile' , studentProfileController)
studentRoute.get('/profile' , getStudentProfileController)
export default studentRoute