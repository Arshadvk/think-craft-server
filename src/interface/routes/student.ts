import express  from "express";
import { passwordCreation} from "../controller/student/studentManagement";
import { studentLogin } from "../controller/student/studentLoginController";
import {  getStudentHomeController, getStudentProfileController, studentProfileController } from "../controller/student/studentProfileController";

import { getAllDomainController } from "../controller/admin/domain/domainController";
import { StudentAuthToken } from "../middlewares/authMiddleware";
import { studentProfileMiddleware } from "../middlewares/profileMiddleware";
import { findTaskByDomainController } from "../controller/task/taskManagementController";
import { findOneReviewController } from "../controller/review/reviewMangmentController";
import { findStudentManifestController } from "../controller/student/studentManifest";


const studentRoute = express.Router()

studentRoute.post('/login' , studentLogin )
studentRoute.put( '/set-password/:id', studentProfileMiddleware, passwordCreation)
studentRoute.put('/set-profile/:id' ,studentProfileMiddleware , studentProfileController)
studentRoute.put('/edit-profile' , StudentAuthToken , studentProfileController )
studentRoute.get('/home' , StudentAuthToken , getStudentHomeController )
studentRoute.get('/profile' ,  StudentAuthToken ,  getStudentProfileController)
studentRoute.get('/get-domaim-info/:id' , studentProfileMiddleware ,  getAllDomainController)
studentRoute.get('/weekly-review' , StudentAuthToken ,findOneReviewController )
studentRoute.get('/weekly-task' ,StudentAuthToken , findTaskByDomainController )
studentRoute.get('/manifest' , StudentAuthToken ,findStudentManifestController  )
studentRoute.post('/weekly-task' , StudentAuthToken  )


export default studentRoute