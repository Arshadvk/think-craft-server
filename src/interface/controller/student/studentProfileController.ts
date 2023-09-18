import { Request, Response } from "express";
import { getStudentProfileUsecase, studentProfileUsecase } from "../../../app/usecase/student/studentProfile";
import { studentModel } from "../../../infra/database/model/student/student";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { Date, ObjectId } from "mongoose";
import { createReviewUsecase, } from "../../../app/usecase/review/reviewCreateUsecase";
import { reviewModel } from "../../../infra/database/model/review/review";
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository";
import { advisorModel } from "../../../infra/database/model/advisor/advisor";
import { createToken } from "../../../domain/entities/student/student";
import { Review } from "../../../domain/entities/review/review";
import ReviewRepositoryIMPL, { filterReview } from "../../../infra/repositories/review/reviewRepository";
import { getReviewByIdUsecase, getReviewListByWeekUseCase, getReviewListUseCase } from "../../../app/usecase/review/reviewFindUsecase";

const studentRepository = studentRepositoryImpl(studentModel)
const reviewRepository = ReviewRepositoryIMPL(reviewModel)
const advisorRepository = AdvisorRepositoryImpl(advisorModel)

export const studentProfileController = async (req: CustomRequest, res: Response) => {
    try {
        const userId: ObjectId = req.user?.student?._id as ObjectId
        const data: object | any = req.body.userData as object | any
        const studentData: object = {
            number: data.number as string,
            address: data.address as string,
            gender: data.gender as string,
            qualification: data.qualification,
            dob: data.dob as Date,
            domain: data.domain as ObjectId,
            isProfileVerified: true
        }
        const student = await studentProfileUsecase(studentRepository)(userId, studentData)
        if (student) {
            const review: Review = {
                week: 1,
                student: userId,
            }
            const newReview = await createReviewUsecase(reviewRepository, advisorRepository, studentRepository)(userId, review)
            const token = createToken(student)
            res.status(200).json({ token: token })
        }
        else res.status(200).json({ message: 'User failed' })
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const getStudentProfileController = async (req: CustomRequest, res: Response) => {
    try {
        const studentId: string = req.user?.student?._id
        const student = await getStudentProfileUsecase(studentRepository)(studentId)
        res.status(200).json(student)
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const getStudentHomeController = async (req: CustomRequest, res: Response) => {
    try {
        const studentId = req.user?.student?._id
        const reviewId: ObjectId = req.body.id as ObjectId
        const review = await getReviewListByWeekUseCase(reviewRepository, studentRepository)(studentId)
        res.status(200).json(review)
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

