import { Request, Response } from "express";
import ReviewRepositoryIMPL, { reviewUpdatedData, taskStatus } from "../../../../infra/repositories/review/reviewRepository";
import { reviewModel } from "../../../../infra/database/model/review/review";
import { UpdateReviewUsecase } from "../../../../app/usecase/review/reviewUpdateUsecase";
import { ObjectId } from "mongoose";
import AdvisorRepositoryImpl from "../../../../infra/repositories/advisor/advisorRepository";
import studentRepositoryImpl from "../../../../infra/repositories/student/studentRepository";
import { advisorModel } from "../../../../infra/database/model/advisor/advisor";
import { studentModel } from "../../../../infra/database/model/student/student";
import { createReviewUsecase, weekBackUsecase } from "../../../../app/usecase/review/reviewCreateUsecase";
import { Review } from "../../../../domain/entities/review/review";
import { CustomRequest } from "../../../middlewares/authMiddleware";

const reviewRepository = ReviewRepositoryIMPL(reviewModel)
const advisorRepository = AdvisorRepositoryImpl(advisorModel)
const studentRepository = studentRepositoryImpl(studentModel)

export const updatedReviewController =async (req :CustomRequest , res : Response) => {
    try {
        let data : reviewUpdatedData = {}
        let taskStatus : taskStatus = {}
        
        const value = req.body.value 
        console.log(req.body);
        
        const advisor : ObjectId = req.user?.advisor?._id  as ObjectId
        const reviewId  : ObjectId = req.body?.id as ObjectId
        const seminarVideo = value.seminar as string | undefined 
        const progressVideo = value.progress
        const week : number = value.week as number
        const typing = value.typing 
        const weekStatus = value.weekStatus
        const student = value.student 


        if (seminarVideo)taskStatus.seminar = seminarVideo 
        if (progressVideo)taskStatus.progress= progressVideo
        if (typing) taskStatus.typing = typing
        
        data.taskStatus = taskStatus

        const updatedReview = await UpdateReviewUsecase(reviewRepository)(reviewId , data )
        console.log(updatedReview+"mjsdnfj");
        
        if (weekStatus == 'pass') {
            console.log(weekStatus);
            
            const review : Review = {
                week : week+1
            }
            
            const newReview = await createReviewUsecase(reviewRepository , advisorRepository , studentRepository)(student , review )
            res.status(200).json(newReview)
        }else{
            console.log("gff");
            
            const review : Review ={
                week : week ,
                advisor : advisor
            }
            const newReview = await weekBackUsecase(reviewRepository )(review)
            res.status(200).json(newReview)
        }
    }  catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
}