import express from "express"
import { adminLogin, createAdminController, passwordChangeController } from "../controller/admin/adminLogin"
import { blockStudentController, createStudentController, getAllStudentSearchFilterSortController } from "../controller/student/studentManagement"
import { blockReviewerController, createReviewerController, getAllReviewerSearchFilterSortController } from "../controller/reviewer/reviewerManagment"
import { blockAdvisorController, createAdvisorController, getAllAdvisorSearchFilterSortController } from "../controller/advisor/advisorMangment"
import { addDomainController } from "../controller/admin/domain/domainController"
import { addTaskController } from "../controller/admin/task/taskManagment"


const adminRoute = express.Router()

adminRoute.post('/login', adminLogin)
adminRoute.post('/add-student' ,createStudentController )
adminRoute.post('/add-reviewer' ,createReviewerController)
adminRoute.post('/add-advisor',createAdvisorController)
adminRoute.get('/all-student', getAllStudentSearchFilterSortController)
adminRoute.get('/all-reviewer', getAllReviewerSearchFilterSortController)
adminRoute.get('/all-advisor', getAllAdvisorSearchFilterSortController)
adminRoute.patch('/block-unblock-student', blockStudentController)
adminRoute.patch('/block-unblock-reviewer', blockReviewerController)
adminRoute.patch('/block-unblock-advisor', blockAdvisorController)
adminRoute.post('/add-domain' , addDomainController)
adminRoute.put('/change-password',passwordChangeController )
adminRoute.post('/add-admin' , createAdminController)
adminRoute.post('/add-task',addTaskController)

export default adminRoute