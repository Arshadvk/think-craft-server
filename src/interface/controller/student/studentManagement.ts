import { Request, Response } from "express";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { studentModel } from "../../../infra/database/model/student/student";
import { setPasswordUsecase } from "../../../app/usecase/student/setPassword";
import { createStudentUsecase, getAllStudentUseCase } from "../../../app/usecase/admin/student/createStudent";



const studentRepository = studentRepositoryImpl(studentModel)

export const createStudentController = async (req: Request, res: Response) => {
    try {
        const studentData = req.body
        console.log(studentData);
        const newStudent = await createStudentUsecase(studentRepository)(studentData)
        console.log(newStudent)
        res.status(200).send({ message: "Student Created Successfully" })

    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const passwordCreation = async (req: Request, res: Response) => {
    try {
        const studentData = req.body 
        const newPassword = await setPasswordUsecase(studentRepository)(studentData)
        res.status(200).send({message:"password change successfully"})


    } catch (error) {
        
    }
}

export const getAllStudentSearchFilterSortController = async (req : Request , res : Response)=>{
    try {
        const studentList = await getAllStudentUseCase(studentRepository)()
        res.status(200).json(studentList)
    } catch (error) {
        
    }
}