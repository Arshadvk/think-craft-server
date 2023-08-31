import { Request, Response } from "express";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { findAllTaskUsecase, findTaskByDomainUsecase } from "../../../app/usecase/admin/task/taskMangmentUsecase";
import taskRepositoryIMPL, { FilterTask } from "../../../infra/repositories/task/taskRepository";
import { taskModel } from "../../../infra/database/model/task/task";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { studentModel } from "../../../infra/database/model/student/student";

const taskRepository = taskRepositoryIMPL(taskModel)
const studentRepository = studentRepositoryImpl(studentModel)
export const findTaskByDomainController =async (req:CustomRequest , res : Response) => {
    try {
        const userId:string =  req.user?.student?._id 
        const task = await findTaskByDomainUsecase(taskRepository ,studentRepository )(userId)        
        res.status(200).json(task)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
}

export const getAllTaskController =async (req:Request , res : Response) => {
    try {
        let filterData : FilterTask = {}
        if (req.query.week) filterData.week = {'task.week' : req.query.week  } 
        if(req.query.domain) filterData.domian = req.query.domain as string
        const task = await findAllTaskUsecase(taskRepository)(filterData)
        res.status(200).send(task)
    } catch (error) {
        
    }
    
}