import { Request , Response } from "express"
import reviewerRepositoryImpl from "../../../infra/repositories/reviewer/reviewerRepository"
import { reviewerModel } from "../../../infra/database/model/reviewer/reviewer"
import { createReviewerUsecase, getAllReviewerUsecase } from "../../../app/usecase/admin/reviewer/createReviewer"
import { setPasswordUsecaseReviewer } from "../../../app/usecase/reviewer/setPassword"
import { AppError } from "../../../utils/error"
import { blockReviewerUsecase } from "../../../app/usecase/admin/reviewer/block-unblock"
import { CustomRequest } from "../../middlewares/authMiddleware"

export interface Filter {
    search ?: Object
    email ?: object
    name?: object ;
    domain?: string | undefined
     
}

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
export const passwordCreationReviewer =async (req:CustomRequest , res : Response) => {
    try {
        const reviewerId:string = req.user?.reviewer?._id as string
        const reviewerData = req.body
        const newPassword = await setPasswordUsecaseReviewer(reviewerRepository)(reviewerData ,reviewerId)
        res.status(200).send({message:"password change successfully"})
        
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })     
    }
}

export const getAllReviewerSearchFilterSortController =async (req:Request , res :Response) => {
    try {
        
        let sortCriteria : object
        let filterData : Filter ={}
        if(req.query.search){
            
            filterData.search = {
                $or : [ {email : {$regex: req.query.search as string , $options : 'i' } }, 
             { name:  {$regex: req.query.search as string , $options : 'i' }}
    
            ]}
        } 
        if(req.query.domain) filterData.domain = req.query.domain as string 
       console.log(filterData.domain);
       
        

        const reviewerList = await getAllReviewerUsecase(reviewerRepository)(filterData)
        res.status(200).json(reviewerList)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })     
    }
        
}

export const blockReviewerController =async (req:Request , res : Response) => {
    try {
        const userId:string | undefined = req.body.id as string
        const action:string | undefined = req.body.action as string


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

