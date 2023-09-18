import express  from "express";
import { StudentAuthToken } from "../middlewares/authMiddleware";
import { passwordCreation} from "../controller/student/studentManagement";
import { studentProfileMiddleware } from "../middlewares/profileMiddleware";
import { getAllDomainController } from "../controller/admin/domain/domainController";
import { findStudentManifestController } from "../controller/student/studentManifest";
import { findOneReviewController } from "../controller/review/reviewMangmentController";
import { findTaskByDomainController } from "../controller/task/taskManagementController";
import { studentChangePassword, studentLogin } from "../controller/student/studentLoginController";
import {  getStudentHomeController, getStudentProfileController, studentProfileController } from "../controller/student/studentProfileController";



const studentRoute = express.Router()

studentRoute.post('/login' , studentLogin )
studentRoute.put( '/set-password/:id', studentProfileMiddleware, passwordCreation)
studentRoute.put('/set-profile/:id' ,studentProfileMiddleware , studentProfileController)
studentRoute.put('/edit-profile' , StudentAuthToken , studentProfileController )
studentRoute.put('/update-password' , StudentAuthToken , studentChangePassword )
studentRoute.get('/home' , StudentAuthToken , getStudentHomeController )
studentRoute.get('/profile' ,  StudentAuthToken ,  getStudentProfileController)
studentRoute.get('/get-domaim-info/:id' , studentProfileMiddleware ,  getAllDomainController)
studentRoute.get('/weekly-review' , StudentAuthToken ,findOneReviewController )
studentRoute.get('/weekly-task' ,StudentAuthToken , findTaskByDomainController )
studentRoute.get('/manifest' , StudentAuthToken ,findStudentManifestController  )


export default studentRoute