import { ObjectId } from "mongoose";
import { AdvisorId } from "../../../domain/entities/advisor/advisor";
import { reviews } from "../../../domain/entities/review/review";
import { AdvisorRepository } from "../../../infra/repositories/advisor/advisorRepository";
import { ReviewRepository, filterReview } from "../../../infra/repositories/review/reviewRepository";

export const createReviewUsecase = (reviewRepository : ReviewRepository , advisorRepository : AdvisorRepository)=>{
    return async (studentId :string , review : reviews)=>{
        const advisors: AdvisorId[] = await advisorRepository.findAvilableAdvisor()
        
        const selectedAdvisor : AdvisorId | null = getRandomAdvisor(advisors) 
        
        if (!selectedAdvisor) {
            throw new Error('No available advisors');
        }
        review.advisor  = selectedAdvisor 
        const newReview = await reviewRepository.createNewReview(studentId , review)
        return newReview
    }
}

export const getRandomAdvisor = (advisors: AdvisorId[]): AdvisorId | null => {
    if (advisors.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * advisors.length);
    return advisors[randomIndex];
};


export const getReviewListUseCase = (reviewRepository : ReviewRepository )=>{
    return async (filterData : any)=>{
        const reviews = await reviewRepository.findReview(filterData)
        return reviews
    }
}