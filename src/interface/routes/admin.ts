import express from "express"
import { adminLogin } from "../controller/admin/adminLogin"
import { blockStudentController, createStudentController, getAllStudentSearchFilterSortController } from "../controller/student/studentManagement"
import { blockReviewerController, createReviewerController, getAllReviewerSearchFilterSortController } from "../controller/reviewer/reviewerManagment"
import { blockAdvisorController, createAdvisorController, getAllAdvisorSearchFilterSortController } from "../controller/advisor/advisorMangment"
import { blockStudentUseCase } from "../../app/usecase/admin/student/block-unblock"


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

export default adminRoute