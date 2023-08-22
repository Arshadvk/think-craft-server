import { Response } from "express";
import { CustomRequest } from "../../middlewares/authMiddleware";

export const getStudentReviewDataController =async (req:CustomRequest , res : Response) => {
    try {
        const userId:string =  req.user?.student?._id 
        
    } catch (error) {
        
    }
    
}