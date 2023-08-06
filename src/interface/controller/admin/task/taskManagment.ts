import { Request, Response } from "express";
import { taskModel } from "../../../../infra/database/model/task/task";
import taskRepositoryIMPL from "../../../../infra/repositories/admin/task/taskRepository";
import { addTaskUsecase } from "../../../../app/usecase/admin/task/taskMangmentUsecase";

const taskRepository = taskRepositoryIMPL(taskModel)
export const addTaskController =async (req:Request,res:Response) => {
    try {
        const task : any = req.body
        const newTask = await addTaskUsecase(taskRepository)(task)
        if(!newTask) res.status(500).json({message:"Somthing went worng"})
        else res.status(200).json({message:"task add succesfully"})
    } catch (error:any) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
        
    }
    
}