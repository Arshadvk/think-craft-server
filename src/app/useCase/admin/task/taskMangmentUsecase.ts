import { tasks } from "../../../../domain/entities/task/task.js";
import { StudentRepository } from "../../../../infra/repositories/student/studentRepository.js";
import { FilterTask, TaskRepository } from "../../../../infra/repositories/task/taskRepository.js";

export const addTaskUsecase = (taskRepository:TaskRepository)=>{
   return async (domainId : string , Tasks : tasks )=>{

    const newTask = await taskRepository.createNewTask(domainId , Tasks)
    return newTask 
   }
}


export const findTaskByDomainUsecase = (taskRepository: TaskRepository , studentRepository : StudentRepository)=>{
   return async (userId: string)=>{
      const student = await studentRepository.findStudentById(userId)
      console.log(student);
      
      const task = await taskRepository.findWeeklyTask(student?.domain?._id as string , student?.week as number)
      return task
   }
}

export const findAllTaskUsecase = (taskRepository : TaskRepository)=>{
   return async (filterData : FilterTask)=>{
      const allTask = await taskRepository.findAllTask(filterData)
      return allTask
   }
}

export const getOneTaskUseCase = (taskRepository : TaskRepository) =>{
   return async (id : string) =>{
      const task = await taskRepository.findOneTask(id)
      return task
   }
}

export const getOneTaskAndUpdate = (taskRepository : TaskRepository)=>{
   return async (id : string  , UpdatedData : Object) =>{
      const task = await taskRepository.findOneTaskAndUpdate(id , UpdatedData)
      return task 
   }
}