import {Request , Response} from "express"
import { CustomRequest } from "../../middlewares/authMiddleware"
import ReviewRepositoryIMPL, { filterReview } from "../../../infra/repositories/review/reviewRepository"
import { findOneReviewUsecase, getReviewListUseCase } from "../../../app/usecase/review/reviewUsecase"
import { reviewModel } from "../../../infra/database/model/review/review"
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository"
import { studentModel } from "../../../infra/database/model/student/student"

const reviewRepository = ReviewRepositoryIMPL(reviewModel)
const studentRepository = studentRepositoryImpl(studentModel)
export const findReviewController =async (req:CustomRequest , res : Response) => {
    try {
        const userId : string = req.user?.advisor?._id 
        let filterData : any = {}
        filterData =  {'reviews.advisor': userId}

        const reviews = await getReviewListUseCase(reviewRepository)(filterData)
        console.log(reviews);
        
        res.status(200).json(reviews)
       
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
    
}

export const findOneReviewController =async (req:CustomRequest , res : Response) => {
    try {
        const userId : string = req.user?.student?._id 
        const review = await findOneReviewUsecase(reviewRepository , studentRepository)(userId)

      console.log(review);
        
        res.status(200).json(review)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
    
}