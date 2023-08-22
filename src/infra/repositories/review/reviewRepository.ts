import { ObjectId } from "mongoose"
import { Review, reviews } from "../../../domain/entities/review/review"
import { MongoDBReview, reviewModel  } from "../../database/model/review/review"

export type filterReview ={
    date ?: Date ,
    student ?: ObjectId 
}

export type ReviewRepository = {
    createNewReview: (studentId: string, review: reviews) => Promise<Review>
    findReview : (filterReview : any ) => Promise <any | null>
}

const ReviewRepositoryIMPL = (ReviewModel: MongoDBReview): ReviewRepository => {

    const createNewReview = async (studentId: string, review: reviews): Promise<Review> => {
        const isReviewExist = await ReviewModel.findOne({ student: studentId })
        console.log(review);
        
        if (!isReviewExist) {
            const newReview = new ReviewModel({
                student: studentId,
                reviews: review
            })

            const createReview: Review = await newReview.save()
            return createReview
        }

        isReviewExist.reviews.push(review)
        await isReviewExist.save()
        return isReviewExist
    }
    const findReview = async (filterData : any ): Promise <any | null > => {
        const reviews : any | null  = await reviewModel.find(filterData).populate({
            path: 'student',
            populate: {
                path: 'domain'
            }
        }).populate('reviews.advisor').populate('student.domain')
        return reviews
    }

    return { createNewReview  , findReview }
}


export default ReviewRepositoryIMPL