import { Request, Response } from "express"
import { Student } from "../../../domain/entities/student/student"
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository"
import { studentModel } from "../../../infra/database/model/student/student"
import { loginStudent } from "../../../app/usecase/student/studentLogin"

export type studentLoginType = {
    email: string
    password: string
}
const studentRepository = studentRepositoryImpl(studentModel)

export const studentLogin = async (req: Request, res: Response) => {
    try {
        const student: Student = req.body
        const studentToken = await loginStudent(studentRepository)(student)
        console.log(studentToken);
        res.status(200).json({studentToken })
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}