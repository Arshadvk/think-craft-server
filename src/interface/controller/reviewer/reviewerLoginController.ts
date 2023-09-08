import { Reviewer } from "../../../domain/entities/reviewer/reviewer"
import { loginReviewer } from "../../../app/usecase/reviewer/reviewerLogin"
import { reviewerModel } from "../../../infra/database/model/reviewer/reviewer"
import reviewerRepositoryImpl from "../../../infra/repositories/reviewer/reviewerRepository"
import { Request , Response } from "express" 

export type reviewerLoginType ={
    email:string
    password:string
}

const reviewerRepository = reviewerRepositoryImpl(reviewerModel)

export const reviewerLoginController = async (req: Request , res: Response)=>{
    try {
        const reviewer :Reviewer = req.body
        console.log(reviewer);
        
        const ReviewerToken = await loginReviewer(reviewerRepository)(reviewer)
        console.log(ReviewerToken);
        res.status(200).json({message:ReviewerToken})
        
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
}