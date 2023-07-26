import { Request, Response } from "express";
import { createStudentUsecase } from "../../../app/useCase/admin/student/createStudent";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { studentModel } from "../../../infra/database/model/student/student";


const studentRepository = studentRepositoryImpl(studentModel)

export const createStudentController = async (req: Request, res: Response) => {
    try {
        const studentData = req.body
        console.log(studentData);
        const newStudent = await createStudentUsecase(studentRepository)(studentData)
        console.log(newStudent)
        res.status(200).send({ message: "Student Created Successfully" })

    } catch (error) {

    }
}

export const createPassword = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        
    }
}