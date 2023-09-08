import { Request, Response } from "express";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { getReviewListUseCase } from "../../../app/usecase/review/reviewUsecase";
import ReviewRepositoryIMPL, { filterReview } from "../../../infra/repositories/review/reviewRepository";
import { reviewModel } from "../../../infra/database/model/review/review";
import { ObjectId } from "mongoose";


const reviewRepository = ReviewRepositoryIMPL(reviewModel)
export const findStudentManifestController =async (req:CustomRequest , res : Response) => {
    try {
        const userId:string =  req.user?.student?._id 
        let filterData : filterReview = {}
         filterData.student = userId as unknown as ObjectId
        const reviews = await getReviewListUseCase(reviewRepository)(filterData)
        res.status(200).json(reviews)

    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}