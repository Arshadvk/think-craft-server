import { Request, Response } from "express";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { findTaskByDomainUsecase } from "../../../app/usecase/admin/task/taskMangmentUsecase";
import taskRepositoryIMPL from "../../../infra/repositories/task/taskRepository";
import { taskModel } from "../../../infra/database/model/task/task";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { studentModel } from "../../../infra/database/model/student/student";

const taskRepository = taskRepositoryIMPL(taskModel)
const studentRepository = studentRepositoryImpl(studentModel)
export const findTaskByDomainController =async (req:CustomRequest , res : Response) => {
    try {
        
        const userId:string =  req.user?.student?._id 
        console.log(userId);
        
        const task = await findTaskByDomainUsecase(taskRepository ,studentRepository )(userId)
        console.log(task);
        
        res.status(200).json(task)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
}