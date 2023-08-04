import { Request , Response } from "express"
import reviewerRepositoryImpl from "../../../infra/repositories/reviewer/reviewerRepository"
import { reviewerModel } from "../../../infra/database/model/reviewer/reviewer"
import { createReviewerUsecase, getAllReviewerUsecase } from "../../../app/usecase/admin/reviewer/createReviewer"
import { setPasswordUsecaseReviewer } from "../../../app/usecase/reviewer/setPassword"
import { AppError } from "../../../utils/error"
import { blockReviewerUsecase } from "../../../app/usecase/admin/reviewer/block-unblock"
import { reviewerProfileUsecase } from "../../../app/usecase/reviewer/reviewerProfile"


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

export const blockReviewerController =async (req:Request , res : Response) => {
    try {
        const userId:string | undefined = req.query.id as string
        const action:string | undefined = req.query.action as string

        if(!userId || !action) throw new AppError("not found" ,404)

        const blocked = await blockReviewerUsecase(reviewerRepository)(userId , action)
        if(blocked === null) throw new AppError("somthing went wrong while fetch the users" ,500)
        if(blocked === true){
            res.status(200).json({ message: 'User blocked succesfully' })
            return
        }else if(blocked===false){
            res.status(200).json({ message: 'User unblocked succesfully' })
            return
        }
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
        
    }
    
}

export const reviewerProfileController =async (req:Request , res : Response) => {
    try {
        const userId : string | undefined = req.body.id as string
        const reviewerData : Object ={
            name : req.body.name as string ,
            number : req.body.number as string , 
            address :  req.body.address as string ,
            age : req.body.age , 
            dob : req.body.dob , 
            sex : req.body.sex , 
            education : req.body.education ,
            company : req.body.company 
        }
        const reviewer = await reviewerProfileUsecase(reviewerRepository)(userId , reviewerData)
        if(reviewer)  res.status(200).json(reviewer)

        else  res.status(200).json({ message: 'User failed' })
    } catch (error) {
        
    }
}