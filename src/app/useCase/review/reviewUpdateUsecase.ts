import { ObjectId } from "mongoose";
import { Review } from "../../../domain/entities/review/review.js";
import { ReviewRepository, reviewUpdatedData } from "../../../infra/repositories/review/reviewRepository.js";

export const UpdateReviewUsecase = (reviewRepository: ReviewRepository) => {
    return async (reviewId: ObjectId, reviewUpdatedData: reviewUpdatedData) => {
        const updatedReview: Review | null = await reviewRepository.findReviewAndUpdate(reviewId, reviewUpdatedData)
        return updatedReview
    }
}