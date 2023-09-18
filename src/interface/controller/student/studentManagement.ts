import { Request, Response } from "express";
import { AppError } from "../../../utils/error.js";
import { Filter } from "../reviewer/reviewerManagment.js";
import { CustomRequest } from "../../middlewares/authMiddleware.js";
import { studentModel } from "../../../infra/database/model/student/student.js";
import { setPasswordUsecase } from "../../../app/usecase/student/setPassword.js";
import { blockStudentUseCase } from "../../../app/usecase/admin/student/block-unblock.js"
import { createStudentUsecase } from "../../../app/usecase/admin/student/createStudent.js";
import { getAllStudentUseCase } from "../../../app/usecase/admin/student/getAllStudent.js";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository.js";



const studentRepository = studentRepositoryImpl(studentModel)

export const createStudentController = async (req: Request, res: Response) => {
    try {
        const studentData = req.body
        const newStudent = await createStudentUsecase(studentRepository)(studentData)
        res.status(200).send({ message: "Student Created Successfully" })
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const passwordCreation = async (req: CustomRequest, res: Response) => {
    try {
        const userId: string = req.user?.student?._id
        const studentData = req.body
        const newPassword = await setPasswordUsecase(studentRepository)(studentData, userId)
        res.status(200).send({ message: "password change successfully" })
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const getAllStudentSearchFilterSortController = async (req: Request, res: Response) => {
    try {
        let filterData: Filter = {}
        if (req.query.search) {

            filterData.search = {
                $or: [{ email: { $regex: req.query.search as string, $options: 'i' } },
                { name: { $regex: req.query.search as string, $options: 'i' } },
                { week: { $eq: req.query.search as unknown as number } }
                ]
            }
        }
        if (req.query.domain) filterData.domain = req.query.domain as string
        const studentList = await getAllStudentUseCase(studentRepository)(filterData)
        res.status(200).json(studentList)
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const blockStudentController = async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.body.id as string
        const action: string | undefined = req.body.action as string

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
