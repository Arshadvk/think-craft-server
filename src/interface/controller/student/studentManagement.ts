import { Request, Response } from "express";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { studentModel } from "../../../infra/database/model/student/student";
import { setPasswordUsecase } from "../../../app/usecase/student/setPassword";
import { createStudentUsecase } from "../../../app/usecase/admin/student/createStudent";
import { getAllStudentUseCase } from "../../../app/usecase/admin/student/getAllStudent";
import { AppError } from "../../../utils/error";
import { blockStudentUseCase } from "../../../app/usecase/admin/student/block-unblock";
import { studentProfileUsecase } from "../../../app/usecase/student/studentProfile";
import { Date } from "mongoose";



const studentRepository = studentRepositoryImpl(studentModel)

export const createStudentController = async (req: Request, res: Response) => {
    try {
        const studentData = req.body
        console.log(studentData);
        const newStudent = await createStudentUsecase(studentRepository)(studentData)
        console.log(newStudent)
        res.status(200).send({ message: "Student Created Successfully" })

    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const passwordCreation = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const studentData = req.body
        console.log(studentData);
        
        const newPassword = await setPasswordUsecase(studentRepository)(studentData ,userId)
        res.status(200).send({ message: "password change successfully" })


    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const getAllStudentSearchFilterSortController = async (req: Request, res: Response) => {
    try {
        const studentList = await getAllStudentUseCase(studentRepository)()
        res.status(200).json(studentList)
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const blockStudentController = async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.body.id as string
        const action: string | undefined = req.body.action as string
        console.log(userId + "uhyugy");

        if (!userId || !action) throw new AppError("Not found", 404)

        const blocked = await blockStudentUseCase(studentRepository)(userId, action)
        if (blocked === null) throw new AppError("somthing went wrong while fetch the users", 500)
        if (blocked === true) {
            res.status(200).json({ message: 'User blocked succesfully' })
            return
        } else if (blocked === false) {
            res.status(200).json({ message: 'User unblocked succesfully' })
            return
        }
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}
