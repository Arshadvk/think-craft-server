import { ObjectId } from "mongoose";
import { Request, Response } from "express";
import { CustomRequest } from "../../middlewares/authMiddleware.js";
import { taskModel } from "../../../infra/database/model/task/task.js";
import { studentModel } from "../../../infra/database/model/student/student.js";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository.js";
import taskRepositoryIMPL, { FilterTask } from "../../../infra/repositories/task/taskRepository.js";
import { findAllTaskUsecase, findTaskByDomainUsecase, getOneTaskUseCase } from "../../../app/usecase/admin/task/taskMangmentUsecase.js";

const taskRepository = taskRepositoryIMPL(taskModel)
const studentRepository = studentRepositoryImpl(studentModel)
export const findTaskByDomainController = async (req: CustomRequest, res: Response) => {
    try {
        const userId: string = req.user?.student?._id
        const task = await findTaskByDomainUsecase(taskRepository, studentRepository)(userId)
        res.status(200).json(task)
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const getAllTaskController = async (req: Request, res: Response) => {
    try {
        let filterData: FilterTask = {}
        if (req.query.week) filterData.week = { 'task.week': req.query.week }
        if (req.query.domain) filterData.domain = req.query.domain as unknown as ObjectId
        if (req.query.id) filterData.task = req.query.id as string
        const task = await findAllTaskUsecase(taskRepository)(filterData)
        res.status(200).json(task)
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const getOneTaskController = async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string
        const task = await getOneTaskUseCase(taskRepository)(id)
        res.status(200).json(task)
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}