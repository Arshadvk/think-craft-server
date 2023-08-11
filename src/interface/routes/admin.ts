import express from "express"
import { adminLogin, createAdminController, passwordChangeController } from "../controller/admin/adminLogin"
import { blockStudentController, createStudentController, getAllStudentSearchFilterSortController } from "../controller/student/studentManagement"
import { blockReviewerController, createReviewerController, getAllReviewerSearchFilterSortController } from "../controller/reviewer/reviewerManagment"
import { blockAdvisorController, createAdvisorController, getAllAdvisorSearchFilterSortController } from "../controller/advisor/advisorMangment"
import { addDomainController, getAllDomainController } from "../controller/admin/domain/domainController"
import { addTaskController } from "../controller/admin/task/taskManagment"
import { adminAuthToken } from "../middlewares/authMiddleware"


const adminRoute = express.Router()

adminRoute.post('/login', adminLogin)

adminRoute.post('/add-student' , adminAuthToken ,createStudentController )
adminRoute.post('/add-reviewer' , adminAuthToken  ,createReviewerController)
adminRoute.post('/add-advisor',adminAuthToken ,createAdvisorController)


adminRoute.get('/all-student', adminAuthToken , getAllStudentSearchFilterSortController)
adminRoute.get('/all-reviewer',adminAuthToken , getAllReviewerSearchFilterSortController)
adminRoute.get('/all-advisor',adminAuthToken , getAllAdvisorSearchFilterSortController)

adminRoute.patch('/block-unblock-student',adminAuthToken , blockStudentController)
adminRoute.patch('/block-unblock-reviewer',adminAuthToken ,  blockReviewerController)
adminRoute.patch('/block-unblock-advisor',adminAuthToken, blockAdvisorController)

adminRoute.post('/add-domain' ,adminAuthToken , addDomainController)
adminRoute.get('/all-domain' , adminAuthToken, getAllDomainController )

adminRoute.put('/change-password',passwordChangeController )
adminRoute.post('/add-admin' ,  createAdminController)

adminRoute.post('/add-task',addTaskController)

export default adminRoute