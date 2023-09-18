import { ObjectId } from "mongoose";
import { AdvisorId } from "../../../domain/entities/advisor/advisor";
import { Review, } from "../../../domain/entities/review/review";
import { AdvisorRepository } from "../../../infra/repositories/advisor/advisorRepository";
import { StudentRepository } from "../../../infra/repositories/student/studentRepository";
import { ReviewRepository, taskStatus } from "../../../infra/repositories/review/reviewRepository";
import { mark } from "../../../interface/controller/review/reviewMangmentController";



export const createReviewUsecase = (reviewRepository: ReviewRepository, advisorRepository: AdvisorRepository, studentRepository: StudentRepository) => {
    return async (studentId: ObjectId, review: Review) => {
        const advisors: ObjectId[] = await advisorRepository.findAvilableAdvisor()

        if (!review.advisor) {
            const selectedAdvisor: ObjectId | null = getRandomAdvisor(advisors)

            if (!selectedAdvisor) {
                throw new Error('No available advisors');
            }
            review.advisor = selectedAdvisor
            const weekUpdatedStudent = await studentRepository.updateStudentWeek(studentId, review.week as number)

        }

        const newReview = await reviewRepository.createNewReview(review)

        return newReview
    }

}



export const getRandomAdvisor = (advisors: ObjectId[]): ObjectId | null => {
    if (advisors.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * advisors.length);
    return advisors[randomIndex];
};
