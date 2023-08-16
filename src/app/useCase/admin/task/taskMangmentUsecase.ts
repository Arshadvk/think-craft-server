import { Task, tasks } from "../../../../domain/entities/task/task";
import { StudentRepository } from "../../../../infra/repositories/student/studentRepository";
import { TaskRepository } from "../../../../infra/repositories/task/taskRepository";

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
      
      const task = await taskRepository.findTaskByDomain(student?.domain?._id as string , student?.week as number)
      return task
   }
}