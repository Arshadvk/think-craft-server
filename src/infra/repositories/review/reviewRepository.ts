import mongoose, { ObjectId } from "mongoose";
import { MongoDBReview } from "../../database/model/review/review";
import { Review } from "../../../domain/entities/review/review";

export type filterReview = {
    _id?: ObjectId
    week?: number
    date?: Date,
    student?: ObjectId | undefined
    reviewer?: string | undefined
    advisor?: string | undefined
    type?: string | undefined
    status?: string | undefined
    time?: string
}
export type taskStatus = {
    seminar?: string 
    progress?: string 
    typing?: string 
}
export type reviewUpdatedData = {
    reviewer?: ObjectId | undefined
    mark?: {
        code?: number
        theory?: number
    }
    day?: string
    time?: string
    status?: string | undefined
    pendingTask?: []
    weekStatus?: string
    taskStatus?: taskStatus

}

export type ReviewRepository = {
    createNewReview: (reviewData: Review) => Promise<Review | null>
    findOneReviewByid: (id: ObjectId) => Promise<Review | null>
    findReview: (filterReview: filterReview) => Promise<Review[] | null>
    findReviewAndUpdate: (reviewId: ObjectId, reviewUpdatedData: reviewUpdatedData) => Promise<Review | null>
}

const ReviewRepositoryIMPL = (ReviewModel: MongoDBReview): ReviewRepository => {

    const createNewReview = async (reviewData: Review): Promise<Review | null> => {
        const newReview = new ReviewModel(reviewData)
        const createReview: Review = await newReview.save()
        return createReview
    }
    const findOneReviewByid = async (id: ObjectId): Promise<Review | null> => {
        const review: Review | null = await ReviewModel.findById(id).populate({
            path: 'student',
            populate: {
                path: 'domain'
            }
        }).populate('advisor').populate('student.domain').populate('reviewer')
        return review
    }

    const findReview = async (filterReview: filterReview): Promise<Review[] | null> => {


        const review: Review[] | null = await ReviewModel.find(filterReview).populate({
            path: 'student',
            populate: {
                path: 'domain'
            }
        }).populate('advisor').populate('student.domain').populate('reviewer')


        return review
    }

    const findReviewAndUpdate = async (reviewId: ObjectId, reviewUpdatedData: reviewUpdatedData): Promise<Review | null> => {
        console.log(reviewId);
        console.log(reviewUpdatedData);
        
        const review: Review | null = await ReviewModel.findByIdAndUpdate(reviewId, { $set: reviewUpdatedData })
        return review
    }
    return { createNewReview, findOneReviewByid, findReview, findReviewAndUpdate }
}

export default ReviewRepositoryIMPL