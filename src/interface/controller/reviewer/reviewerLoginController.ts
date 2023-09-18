import { Request , Response } from "express" 
import { CustomRequest } from "../../middlewares/authMiddleware.js"
import { Reviewer } from "../../../domain/entities/reviewer/reviewer.js"
import { changePassType } from "../../../app/usecase/student/studentLogin.js"
import { reviewerModel } from "../../../infra/database/model/reviewer/reviewer.js"
import reviewerRepositoryImpl from "../../../infra/repositories/reviewer/reviewerRepository.js"
import { changeReviewerPassword, loginReviewer } from "../../../app/usecase/reviewer/reviewerLogin.js"

export type reviewerLoginType ={
    email:string
    password:string
}

const reviewerRepository = reviewerRepositoryImpl(reviewerModel)

export const reviewerLoginController = async (req: Request , res: Response)=>{
    try {
        const reviewer :Reviewer = req.body
        const ReviewerToken = await loginReviewer(reviewerRepository)(reviewer)
        res.status(200).json({message:ReviewerToken})
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
}

export const reviewerChangePassword =async (req:CustomRequest , res : Response) => {
    try {
        const reveiwer = req.user.reveiwer._id as string
        const value : changePassType = req.body.value
        const updateReviewer = await changeReviewerPassword(reviewerRepository)(reveiwer , value)
        res.status(200).json(updateReviewer)
        
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}