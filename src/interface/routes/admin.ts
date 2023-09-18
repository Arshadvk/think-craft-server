import express from "express"
import { adminAuthToken } from "../middlewares/authMiddleware.js"
import { addTaskController, editOneTaskController } from "../controller/admin/task/taskManagment.js"
import { getAllTaskController, getOneTaskController } from "../controller/task/taskManagementController.js"
import { addDomainController, getAllDomainController } from "../controller/admin/domain/domainController.js"
import { adminLogin, createAdminController, passwordChangeController } from "../controller/admin/adminLogin.js"
import { blockAdvisorController, createAdvisorController, getAllAdvisorSearchFilterSortController } from "../controller/advisor/advisorMangment.js"
import { blockStudentController, createStudentController, getAllStudentSearchFilterSortController } from "../controller/student/studentManagement.js"
import { blockReviewerController, createReviewerController, getAllReviewerSearchFilterSortController } from "../controller/reviewer/reviewerManagment.js"


const adminRoute = express.Router()

adminRoute.post('/login', adminLogin)

adminRoute.post('/add-student', adminAuthToken, createStudentController)
adminRoute.post('/add-reviewer', adminAuthToken, createReviewerController)
adminRoute.post('/add-advisor', adminAuthToken, createAdvisorController)


adminRoute.get('/all-student', adminAuthToken, getAllStudentSearchFilterSortController)
adminRoute.get('/all-reviewer', adminAuthToken, getAllReviewerSearchFilterSortController)
adminRoute.get('/all-advisor', adminAuthToken, getAllAdvisorSearchFilterSortController)

adminRoute.patch('/block-unblock-student', adminAuthToken, blockStudentController)
adminRoute.patch('/block-unblock-reviewer', adminAuthToken, blockReviewerController)
adminRoute.patch('/block-unblock-advisor', adminAuthToken, blockAdvisorController)

adminRoute.post('/add-domain', adminAuthToken, addDomainController)
adminRoute.get('/all-domain', adminAuthToken, getAllDomainController)

adminRoute.put('/change-password',  passwordChangeController)
adminRoute.post('/add-admin', adminAuthToken, createAdminController)

adminRoute.post('/add-task', adminAuthToken, addTaskController)
adminRoute.put('/edit-task', adminAuthToken, editOneTaskController)
adminRoute.get('/all-task', adminAuthToken, getAllTaskController)
adminRoute.get('/task', adminAuthToken, getOneTaskController)
export default adminRoute