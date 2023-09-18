import { passwordHashing } from "../../../domain/service/hashing.js";
import { ReviewerRepository } from "../../../infra/repositories/reviewer/reviewerRepository.js";


export const setPasswordUsecaseReviewer = (reviewerRepository : ReviewerRepository)=>{
    return async (reviewerData : any , userId : string ):Promise<any | null> =>{
        const password =  await passwordHashing(reviewerData.password)
        const reviewer = await reviewerRepository.setReviewerPassword(userId, password)
        return reviewer
    }
}