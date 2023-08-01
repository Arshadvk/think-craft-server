import express from "express"
import { adminLogin } from "../controller/admin/adminLogin"
import { createStudentController, getAllStudentSearchFilterSortController } from "../controller/student/studentManagement"
import { createReviewerController, getAllReviewerSearchFilterSortController } from "../controller/reviewer/reviewerManagment"
import { createAdvisorController, getAllAdvisorSearchFilterSortController } from "../controller/advisor/advisorMangment"


const adminRoute = express.Router()

adminRoute.post('/login', adminLogin)
adminRoute.post('/add-student' ,createStudentController )
adminRoute.post('/add-reviewer' ,createReviewerController)
adminRoute.post('/add-advisor',createAdvisorController)
adminRoute.get('/all-student', getAllStudentSearchFilterSortController)
adminRoute.get('/all-reviewer', getAllReviewerSearchFilterSortController)
adminRoute.get('/all-advisor', getAllAdvisorSearchFilterSortController)

export default adminRoute