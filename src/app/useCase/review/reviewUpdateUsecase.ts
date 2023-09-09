import { ObjectId } from "mongoose";
import { Review } from "../../../domain/entities/review/review";
import { ReviewRepository, reviewUpdatedData } from "../../../infra/repositories/review/reviewRepository";

export const UpdateReviewUsecase = (reviewRepository: ReviewRepository) =>{
    return async (reviewId: ObjectId,reviewUpdatedData:reviewUpdatedData)=> {
        const updatedReview : Review  | null  = await reviewRepository.findReviewAndUpdate(reviewId , reviewUpdatedData) 
        return updatedReview
    }
}