import { Request , Response } from "express"
import reviewerRepositoryImpl from "../../../infra/repositories/reviewer/reviewerRepository"
import { createReviewerUsecase } from "../../../app/useCase/admin/reviewer/createReviewer"
import { reviewerModel } from "../../../infra/database/model/reviewer/reviewer"
import { setPasswordUsecaseReviewer } from "../../../app/useCase/reviewer/setPassword"


const reviewerRepository = reviewerRepositoryImpl(reviewerModel)

export const createReviewerController = async (req:Request , res : Response)=>{
    try {
        const reviewerData = req.body
        console.log(reviewerData);
        const newReviewer = await createReviewerUsecase(reviewerRepository)(reviewerData)
        console.log(newReviewer);
        res.status(200).send({message:"reviewer created succussfully"})
    } catch (error) {
        
    }
}
export const passwordCreationReviewer =async (req:Request , res : Response) => {
    try {
        const reviewerData = req.body
        const newPassword = await setPasswordUsecaseReviewer(reviewerRepository)(reviewerData)
        res.status(200).send({message:"password change successfully"})
        
    } catch (error) {
        
    }
}