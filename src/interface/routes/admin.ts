import express from "express"
import { adminLogin } from "../controller/admin/adminLogin"
import { createStudentController } from "../controller/student/studentManagement"
import { createReviewerController } from "../controller/reviewer/reviewerManagment"
import { createAdvisorController } from "../controller/advisor/advisorMangment"


const adminRoute = express.Router()

adminRoute.post('/login', adminLogin)
adminRoute.post('/add-student' ,createStudentController )
adminRoute.post('/add-reviewer' ,createReviewerController)
adminRoute.post('/add-advisor',createAdvisorController)


export default adminRoute