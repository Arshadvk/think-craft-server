import { reviews } from "../../../domain/entities/review/review";
import { ReviewRepository } from "../../../infra/repositories/review/reviewRepository";

export const createReviewUsecase = (reviewRepository : ReviewRepository)=>{
    return async (studentId :string , review : reviews)=>{
        const newReview = await reviewRepository.createNewReview(studentId , review)
        return newReview
    }
}