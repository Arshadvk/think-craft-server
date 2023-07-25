import express from "express"
import { adminLogin } from "../controller/admin/adminLogin"
import { createStudentController } from "../controller/student/studentManagement"


const adminRoute = express.Router()

adminRoute.post('/login', adminLogin)
adminRoute.post('/add-student' ,createStudentController )



export default adminRoute