import {Request , Response} from "express"
import { CustomRequest } from "../../middlewares/authMiddleware"
import ReviewRepositoryIMPL, { filterReview } from "../../../infra/repositories/review/reviewRepository"
import { getReviewListUseCase } from "../../../app/usecase/review/reviewUsecase"
import { reviewModel } from "../../../infra/database/model/review/review"

const reviewRepository = ReviewRepositoryIMPL(reviewModel)

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