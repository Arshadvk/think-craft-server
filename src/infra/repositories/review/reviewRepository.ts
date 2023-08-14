import { Review, reviews } from "../../../domain/entities/review/review"
import { MongoDBReview } from "../../database/model/review/review"

export type ReviewRepository = {
    createNewReview: (studentId: string, review: reviews) => Promise<Review>
}

const ReviewRepositoryIMPL = (ReviewModel: MongoDBReview): ReviewRepository => {

    const createNewReview = async (studentId: string, review: reviews): Promise<Review> => {
        const isReviewExist = await ReviewModel.findOne({ student: studentId })
        if (!isReviewExist) {
            const newReview = new ReviewModel({
                student: studentId,
                review: review
            })

            const createReview: Review = await newReview.save()
            return createReview
        }

        isReviewExist.reviews.push(review)
        await isReviewExist.save()
        return isReviewExist
    }
    return { createNewReview }
}

export default ReviewRepositoryIMPL