import { MongoDBUploadTask } from "../../database/model/uploadTask/uploadTask"

export type UploadTaskRepository = {
    uploadNewTask:(taskId:string)=>Promise <any>
}

const uploadTaskRepositoryIMPL = (UploadTaskModel:MongoDBUploadTask):UploadTaskRepository =>{

    const uploadNewTask = async (taskId:string , ):Promise <any>=> {
        
    }
    return {uploadNewTask}
}