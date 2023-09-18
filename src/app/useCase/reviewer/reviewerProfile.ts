import { ReviewerRepository } from "../../../infra/repositories/reviewer/reviewerRepository.js";

export const reviewerProfileUsecase = (reviewerRepository : ReviewerRepository)=>{
    return async (userId: string , reviewerData:object):Promise <any | null >=>{
        const reviewer = await reviewerRepository.updateReviewerProfile(userId , reviewerData)
        return reviewer
    }
}

export const getReviewerProfileUsecase = (reviewerRepository: ReviewerRepository)=>{
    return async (userId:string):Promise<any>=>{
        const reviewer = await reviewerRepository.findReviewerById(userId)
        return reviewer
    }
}