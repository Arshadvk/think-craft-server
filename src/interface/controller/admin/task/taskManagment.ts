import { Request, Response } from "express";
import { taskModel } from "../../../../infra/database/model/task/task";
import taskRepositoryIMPL from "../../../../infra/repositories/task/taskRepository";
import { addTaskUsecase } from "../../../../app/usecase/admin/task/taskMangmentUsecase";
import { tasks } from "../../../../domain/entities/task/task";

const taskRepository = taskRepositoryIMPL(taskModel)
export const addTaskController =async (req:Request,res:Response) => {
    try {

        const domainId : string = req.body.domain
        console.log(req.body);
        
        const task : tasks = {
          week : req.body.weekNo ,
          miscellaneousWorkouts : req.body.miscellaneousWorkouts ,
          personalDevelopmentWorkout : req.body.personalDevelopmentWorkout , 
          technicalWorkouts : req.body.technicalWorkouts
        }
        
        const newTask = await addTaskUsecase(taskRepository)( domainId , task)

        if(!newTask) res.status(500).json({message:"Somthing went worng"})

        else res.status(200).json({message:"task add succesfully"})

    } catch (error:any) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
        
    }
    
}