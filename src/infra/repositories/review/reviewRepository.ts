import { ObjectId } from "mongoose"
import { Review, reviews } from "../../../domain/entities/review/review"
import { MongoDBReview, reviewModel  } from "../../database/model/review/review"

export type filterReview ={
    date ?: Date ,
    student ?: ObjectId 
}

export type ReviewRepository = {
    createNewReview: (studentId: string, review: reviews) => Promise<Review>
    findReview : (filterReview : any ) => Promise <Review | null>
    findReviewAndUpdate : (studentId : string , week : number , reviewer : string) => Promise <Review | null>
    findOneReview : (studentId : string , week : number) => Promise <Review | null >
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
    const findReview = async (filterData : any ): Promise <Review | null > => {
        const reviews : any | null  = await reviewModel.find(filterData).populate({
            path: 'student',
            populate: {
                path: 'domain'
            }
        }).populate('reviews.advisor').populate('student.domain')
        return reviews
    }

    const findReviewAndUpdate = async (studentId: string, week: number, reviewer: string): Promise<Review | null> => {
        const review: Review | null = await reviewModel.findOneAndUpdate(
            { student: studentId, 'reviews.week': week },
            { $set: { 'reviews.$.reviewer': reviewer } } // Use the positional operator $ to update the specific element
        );
        return review;
    };

    const findOneReview  = async (studentId:string , week : number): Promise <Review | null>  => {
        const reviews : Review | null = await reviewModel.findOne({student : studentId , "reviews.week" : week})
        return reviews
    }

    return { createNewReview  , findReview  , findReviewAndUpdate , findOneReview }
}


export default ReviewRepositoryIMPL