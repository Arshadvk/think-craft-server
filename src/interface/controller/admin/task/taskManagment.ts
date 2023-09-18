import { Request, Response } from "express";
import { tasks } from "../../../../domain/entities/task/task.js";
import { taskModel } from "../../../../infra/database/model/task/task.js";
import taskRepositoryIMPL from "../../../../infra/repositories/task/taskRepository.js";
import { addTaskUsecase, getOneTaskAndUpdate } from "../../../../app/usecase/admin/task/taskMangmentUsecase.js";

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

export const editOneTaskController =async (req:Request , res : Response ) => {
  try {
    const value = req.body.value[0]
    const id =  value._id
    console.log("hello" , value);
    
    console.log(req.body);
    
    const UpdatedData = {
      miscellaneousWorkouts : value.miscellaneousWorkouts ,
      personalDevelopmentWorkout : value.personalDevelopmentWorkout , 
      technicalWorkouts : value.technicalWorkouts ,
      week : value.week
    }
    console.log(UpdatedData);
    
    const UpdatedTask = await getOneTaskAndUpdate(taskRepository)(id ,UpdatedData )
    console.log(UpdatedTask,"helloo");
    
     res.status(200).json({message:"task Updated succesfully"})
  } catch (error:any) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
  }
  
}