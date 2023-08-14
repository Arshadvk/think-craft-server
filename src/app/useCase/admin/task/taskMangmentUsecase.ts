import { Task, tasks } from "../../../../domain/entities/task/task";
import { TaskRepository } from "../../../../infra/repositories/task/taskRepository";

export const addTaskUsecase = (taskRepository:TaskRepository)=>{
   return async (domainId : string , Tasks : tasks )=>{

    const newTask = await taskRepository.createNewTask(domainId , Tasks)
    return newTask 
   }
}