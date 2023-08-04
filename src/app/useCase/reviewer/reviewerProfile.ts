import { ReviewerRepository } from "../../../infra/repositories/reviewer/reviewerRepository";

export const reviewerProfileUsecase = (reviewerRepository : ReviewerRepository)=>{
    return async (userId: string , reviewerData:object):Promise <any | null >=>{
        const reviewer = await reviewerRepository.updateReviewerProfile(userId , reviewerData)
        return reviewer
    }
}