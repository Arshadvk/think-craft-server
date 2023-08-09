import express  from "express";
import { passwordCreation} from "../controller/student/studentManagement";
import { studentLogin } from "../controller/student/studentLoginController";
import { getStudentProfileController, studentProfileController } from "../controller/student/studentProfileController";
import StudentAuthenticateToken from "../middlewares/authMiddleware";
import { getAllDomainController } from "../controller/admin/domain/domainController";


const studentRoute = express.Router()

studentRoute.post('/login' ,studentLogin )
studentRoute.put('/setpassword/:id',  passwordCreation)
studentRoute.put('/edit-profile/:id' , studentProfileController)
studentRoute.get('/profile/:id'  , getStudentProfileController)
studentRoute.get('/get-domaim-info' , getAllDomainController)
export default studentRoute