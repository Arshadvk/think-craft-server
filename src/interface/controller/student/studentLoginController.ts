import { ObjectId } from "mongoose"
import { Request, Response } from "express"
import { CustomRequest } from "../../middlewares/authMiddleware.js"
import { Student } from "../../../domain/entities/student/student.js"
import { studentModel } from "../../../infra/database/model/student/student.js"
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository.js"
import { changePassType, changeStudentPassword, loginStudent } from "../../../app/usecase/student/studentLogin.js"

export type studentLoginType = {
    email: string
    password: string
}
const studentRepository = studentRepositoryImpl(studentModel)

export const studentLogin = async (req: Request, res: Response) => {
    try {
        const student: Student = req.body
        const studentToken = await loginStudent(studentRepository)(student)
        res.status(200).json({studentToken })
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const studentChangePassword =async (req:CustomRequest , res : Response) => {
    try {
        const student = req.user.student._id as ObjectId
        const value : changePassType = req.body.value
        const updateStudent = await changeStudentPassword(studentRepository)(student , value)
        res.status(200).json(updateStudent)
        
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}