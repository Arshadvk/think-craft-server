import { ObjectId } from "mongoose";
import { Review } from "../../../domain/entities/review/review";
import { Student } from "../../../domain/entities/student/student";
import { StudentRepository } from "../../../infra/repositories/student/studentRepository";
import { ReviewRepository, filterReview } from "../../../infra/repositories/review/reviewRepository";


export const getReviewByIdUsecase = (reviewRepository: ReviewRepository) => {
    return async (reviewId: ObjectId) => {
        const review: Review | null = await reviewRepository.findOneReviewByid(reviewId)
        return review
    }

}

export const getReviewListUseCase = (reviewRepository: ReviewRepository) => {
    return async (filterReview: filterReview) => {
        const review: Review[] | null = await reviewRepository.findReview(filterReview)
        return review
    }
}

export const getReviewListByWeekUseCase = (reviewRepository: ReviewRepository, studentRepository: StudentRepository) => {
    return async (studentId: ObjectId) => {
        const student: Student = await studentRepository.findStudentById(studentId)
        const filterReview: filterReview = {
            student: studentId,
            week: student.week
        }

        const review: Review[] | null = await reviewRepository.findReview(filterReview)

        if (review) {

            return review[review?.length - 1]
        }


        return review
    }
}
