import { UploadTask, uploads } from "../../../domain/entities/upload_task/uploadTask"
import { MongoDBUploadTask } from "../../database/model/uploadTask/uploadTask"

export type UploadTaskRepository = {
    uploadNewTask:(studentId:string  , task : uploads)=>Promise <any>
}

const uploadTaskRepositoryIMPL = (UploadTaskModel:MongoDBUploadTask):UploadTaskRepository =>{

    const uploadNewTask = async (studentId:string , task : uploads):Promise <any>=> {
        const isTaskExist = await UploadTaskModel.findOne({student: studentId})
        if (!isTaskExist) {
            const newStudent = new UploadTaskModel({
                student : studentId , 
                uploads : task 
            })
            const createdTask : UploadTask = await newStudent.save()
            return createdTask
        }  
        isTaskExist.uploads.push(task)
        await isTaskExist.save()
        return isTaskExist 
      }
    return {uploadNewTask}
}
export default uploadTaskRepositoryIMPL