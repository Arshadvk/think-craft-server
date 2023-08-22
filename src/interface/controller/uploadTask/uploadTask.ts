import { Request, Response } from "express";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { uploadTaskUsecase } from "../../../app/usecase/student/uploadTask/uploadTaskUseCase";
import uploadTaskRepositoryIMPL from "../../../infra/repositories/uploadTask/uploadTaskRepository";
import { uploadTaskModel } from "../../../infra/database/model/uploadTask/uploadTask";
import {  uploads } from "../../../domain/entities/upload_task/uploadTask";

const uploadTaskRepository = uploadTaskRepositoryIMPL(uploadTaskModel)

export const uploadTaskByStudentController =async (req :CustomRequest , res : Response) => {
    try {
        const userId : string = req.user?.student?._id 
        const upload_task  : uploads = req.body
        const uploadTask = await uploadTaskUsecase(uploadTaskRepository)(userId , upload_task)
        res.status(200).json(uploadTask)
    } catch (error : any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
        
    }
    
}