import express  from "express";
import { passwordCreation} from "../controller/student/studentManagement";
import { studentLogin } from "../controller/student/studentLoginController";
import { getStudentProfileController, studentProfileController } from "../controller/student/studentProfileController";

import { getAllDomainController } from "../controller/admin/domain/domainController";
import { StudentAuthToken } from "../middlewares/authMiddleware";
import { studentProfileMiddleware } from "../middlewares/profileMiddleware";


const studentRoute = express.Router()

studentRoute.post('/login' ,studentLogin )
studentRoute.put('/setpassword/:id', studentProfileMiddleware, passwordCreation)
studentRoute.put('/edit-profile/:id' ,studentProfileMiddleware , studentProfileController)
studentRoute.get('/profile' ,  StudentAuthToken ,  getStudentProfileController)
studentRoute.get('/get-domaim-info/:id' , studentProfileMiddleware ,  getAllDomainController)

export default studentRoute