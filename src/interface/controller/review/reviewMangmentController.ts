import {Request , Response} from "express"
import { CustomRequest } from "../../middlewares/authMiddleware"
import { createReviewUsecase } from "../../../app/usecase/review/reviewCreateUsecase"
import { reviewModel } from "../../../infra/database/model/review/review"
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository"
import { studentModel } from "../../../infra/database/model/student/student"
import { ObjectId } from "mongoose"
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository"
import { advisorModel } from "../../../infra/database/model/advisor/advisor"
import { Review } from "../../../domain/entities/review/review"
import ReviewRepositoryIMPL, { filterReview, reviewUpdatedData } from "../../../infra/repositories/review/reviewRepository"
import { getReviewByIdUsecase, getReviewListUseCase } from "../../../app/usecase/review/reviewFindUsecase"
import { UpdateReviewUsecase } from "../../../app/usecase/review/reviewUpdateUsecase"

export type mark = {
    code ?: number 
    theroy ?: number
}

const reviewRepository = ReviewRepositoryIMPL(reviewModel)
const advisorRepository = AdvisorRepositoryImpl(advisorModel)
const studentRepository = studentRepositoryImpl(studentModel)
export const findReviewController =async (req:CustomRequest , res : Response) => {
    try {
        const status : string | undefined = req.query.type as string
        const home : string | undefined = req.query.home as string         
        const advisor : string | undefined = req.user?.advisor?._id as string
        const reviewer : string | undefined =  req.user?.reviewer?._id   as string 
        const student : ObjectId | undefined = req.query.student as unknown as ObjectId
        const id : ObjectId | undefined = req.query.id as unknown as ObjectId
        let filterData : filterReview = {}
        if (home) {
            filterData.status = "review-scheduled"
        }

        if (status) {
            filterData.status = "not-scheduled" 
        }
        if (advisor) {
            filterData.advisor =  advisor  
        }
        if (reviewer) {
            filterData.reviewer = reviewer 
        }
       if (student){
            filterData.student = student 
        }
        if (id) {
            filterData._id = id
        }

        
        const reviews = await getReviewListUseCase(reviewRepository)(filterData)        
        res.status(200).json(reviews)
       
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
    
}

export const findOneReviewController =async (req:CustomRequest , res : Response) => {
    try {
        const userId : string = req.user?.student?._id 
        const week : ObjectId | undefined = req.query.week as unknown as ObjectId 
        const review = await getReviewByIdUsecase(reviewRepository )(week)
      console.log(review);
        
        res.status(200).json(review)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
    
}

export const updateReviewController =async (req :Request , res : Response ) => {
    try {
        console.log(req.body);
        let data : reviewUpdatedData = {}
        const value : reviewUpdatedData = req.body?.value 
       
        if (value?.mark) {
            data.mark = value?.mark
            data.status = "conducted"
        }
        const pendingTask : [] | undefined = req.body.pendingTopic
        if (pendingTask) {
            data.pendingTask  = pendingTask
        } 
        const reviewId  : ObjectId = req.body?.id as ObjectId
     
        const week : number = req.body.week as number

        const updatedReview = await UpdateReviewUsecase(reviewRepository)(reviewId , data )
        
        res.status(200).json(updatedReview)

    }  catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
}
