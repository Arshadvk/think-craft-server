import express from "express"
// import { adminLogin, createAdminController, passwordChangeController } from "../controller/admin/adminLogin"
import { blockStudentController, createStudentController, getAllStudentSearchFilterSortController } from "../controller/student/studentManagement"
import { blockReviewerController, createReviewerController, getAllReviewerSearchFilterSortController } from "../controller/reviewer/reviewerManagment"
import { blockAdvisorController, createAdvisorController, getAllAdvisorSearchFilterSortController } from "../controller/advisor/advisorMangment"
import { addDomainController, getAllDomainController } from "../controller/admin/domain/domainController"
import { addTaskController, editOneTaskController } from "../controller/admin/task/taskManagment"
import { adminAuthToken } from "../middlewares/authMiddleware"
import { getAllTaskController, getOneTaskController } from "../controller/task/taskManagementController"


const adminRoute = express.Router()

// adminRoute.post('/login', adminLogin)

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

// adminRoute.put('/change-password' , adminAuthToken ,passwordChangeController )
// adminRoute.post('/add-admin' ,adminAuthToken , createAdminController)

adminRoute.post('/add-task',adminAuthToken ,  addTaskController)
adminRoute.put('/edit-task' , adminAuthToken , editOneTaskController)
adminRoute.get('/all-task' , adminAuthToken ,  getAllTaskController)
adminRoute.get('/task' , adminAuthToken ,  getOneTaskController)
export default adminRoute