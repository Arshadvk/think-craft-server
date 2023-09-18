import { ObjectId } from "mongoose";
import { Request, Response } from "express";
import { mark } from "../reviewMangmentController.js";
import { Review } from "../../../../domain/entities/review/review.js";
import { CustomRequest } from "../../../middlewares/authMiddleware.js";
import { reviewModel } from "../../../../infra/database/model/review/review.js";
import { advisorModel } from "../../../../infra/database/model/advisor/advisor.js";
import { studentModel } from "../../../../infra/database/model/student/student.js";
import { createReviewUsecase } from "../../../../app/usecase/review/reviewCreateUsecase.js";
import { UpdateReviewUsecase } from "../../../../app/usecase/review/reviewUpdateUsecase.js";
import AdvisorRepositoryImpl from "../../../../infra/repositories/advisor/advisorRepository.js";
import studentRepositoryImpl from "../../../../infra/repositories/student/studentRepository.js";
import ReviewRepositoryIMPL, { reviewUpdatedData, taskStatus } from "../../../../infra/repositories/review/reviewRepository.js";

const reviewRepository = ReviewRepositoryIMPL(reviewModel)
const advisorRepository = AdvisorRepositoryImpl(advisorModel)
const studentRepository = studentRepositoryImpl(studentModel)

export const updatedReviewController = async (req: CustomRequest, res: Response) => {
    try {
        let data: reviewUpdatedData = {}
        let taskStatus: taskStatus = {}

        const value = req.body.value

        const reviewId: ObjectId = req.body?.id as ObjectId
        const seminarVideo = value.seminar as string | undefined
        const progressVideo = value.progress
        const typing = value.typing

        if (seminarVideo) taskStatus.seminar = seminarVideo
        if (progressVideo) taskStatus.progress = progressVideo
        if (typing) taskStatus.typing = typing

        data.taskStatus = taskStatus

        const updatedReview = await UpdateReviewUsecase(reviewRepository)(reviewId, data)
        res.status(200).json(updatedReview)

    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const createReviewController = async (req: CustomRequest, res: Response) => {
    try {
        const value = req.body.value
        const week: number = value.week as number
        const student = value.student
        const status = value.status as string
        const advisorId = req.user.advisor._id as ObjectId

        let review: Review = {}

        const taskStatus: taskStatus = {
            progress: 'Not added',
            seminar: 'Not added',
            typing: 'Not added'
        }

        const mark: mark = {
            code: 0,
            theroy: 0
        }
        if (status === "next-week") {
            review.week = week + 1
        } else {
            review.week = week
            review.advisor = advisorId
        }
        review.student = student
        review.mark = mark
        review.taskStatus = taskStatus

        const newReview = await createReviewUsecase(reviewRepository, advisorRepository, studentRepository)(student, review)
        res.status(200).json(newReview)

    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}