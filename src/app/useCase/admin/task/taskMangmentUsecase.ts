import { TaskRepository } from "../../../../infra/repositories/admin/task/taskRepository";

export const addTaskUsecase = (taskRepository:TaskRepository)=>{
    return async (task:any):Promise<any>=>{
        const newTask : any = await taskRepository.createNewTask(task)
        return newTask

    }
}