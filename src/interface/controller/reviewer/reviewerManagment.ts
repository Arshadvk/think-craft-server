import { Request , Response } from "express"
import reviewerRepositoryImpl from "../../../infra/repositories/reviewer/reviewerRepository"
import { reviewerModel } from "../../../infra/database/model/reviewer/reviewer"
import { createReviewerUsecase, getAllReviewerUsecase } from "../../../app/usecase/admin/reviewer/createReviewer"
import { setPasswordUsecaseReviewer } from "../../../app/usecase/reviewer/setPassword"


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

export const getAllReviewerSearchFilterSortController =async (req:Request , res :Response) => {
    try {
        const reviewerList = await getAllReviewerUsecase(reviewerRepository)()
        res.status(200).json(reviewerList)
    } catch (error) {
        
    }    
}