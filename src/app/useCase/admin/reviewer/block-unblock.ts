import { ReviewerRepository } from "../../../../infra/repositories/reviewer/reviewerRepository.js";

export const blockReviewerUsecase = (reviewerRepository : ReviewerRepository) =>{
    return async (userId :string , action : string):Promise <Boolean | undefined >=>{
        const reviewer = await reviewerRepository.updateIsBlock(userId , action)
        return reviewer
    }
}