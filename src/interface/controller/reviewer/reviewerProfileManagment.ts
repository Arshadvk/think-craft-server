import { Request, Response } from "express";
import { getReviewerProfileUsecase, reviewerProfileUsecase } from "../../../app/usecase/reviewer/reviewerProfile";
import reviewerRepositoryImpl from "../../../infra/repositories/reviewer/reviewerRepository";
import { reviewerModel } from "../../../infra/database/model/reviewer/reviewer";

const reviewerRepository = reviewerRepositoryImpl(reviewerModel)

export const reviewerProfileController =async (req:Request , res : Response) => {
    try {
        const userId: string | undefined = req.params.id as string
        console.log(userId);
        console.log(req.body);
        
        
        const data : object | any  = req.body.values as object | any
        const reviewerData : Object ={
            number : data.number as string , 
            address :  data.address as string ,
            age : data.age , 
            dob : data.dob , 
            gender : data.gender , 
            education : data.qualification ,
            domain : data.domain
        }
        console.log(reviewerData);
        
        const reviewer = await reviewerProfileUsecase(reviewerRepository)(userId , reviewerData)
        if(reviewer)  res.status(200).json(reviewer)

        else  res.status(200).json({ message: 'User failed' })
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const getReviewerProfileController =async (req:Request , res : Response) => {
    try {
        console.log("jdufhdsg");
        
        const reviewerId :string = req.params.id
        console.log(reviewerId);
        
        const reviewer = await getReviewerProfileUsecase(reviewerRepository)(reviewerId)
        console.log(reviewer);
        
        res.status(200).json({data:reviewer})
        
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
    
}