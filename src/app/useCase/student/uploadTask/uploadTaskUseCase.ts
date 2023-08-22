import { uploads } from "../../../../domain/entities/upload_task/uploadTask";
import { UploadTaskRepository } from "../../../../infra/repositories/uploadTask/uploadTaskRepository";


export const uploadTaskUsecase = (uploadTaskRepository:UploadTaskRepository)=>{
    return async (studentId : string , uploads : uploads )=>{
        const uploadTask = await uploadTaskRepository.uploadNewTask(studentId ,uploads )
        return uploadTask
    }
}