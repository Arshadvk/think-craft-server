import { reviewerLoginValidate } from "../../../domain/entities/reviewer/reviewer";
import { ReviewerRepository } from "../../../infra/repositories/reviewer/reviewerRepository";
import { reviewerLoginType } from "../../../interface/controller/reviewer/reviewerLoginController";
import { AppError } from "../../../utils/error";

type reviewerReturnType = {
    token:string,
    status:string
}

export const loginReviewer = (reviewerRepository:ReviewerRepository)=>{
    return async (reviewer: reviewerLoginType):Promise<reviewerReturnType>=>{
        const isReviewerExist :reviewerLoginType | null = await reviewerRepository.findReviewerByEmail(reviewer.email)
        if(!isReviewerExist) throw new AppError("user is not exist" , 404)
        const ReviewerToken = await reviewerLoginValidate(reviewer , isReviewerExist)
        const verifiedReviewer = {
            token:ReviewerToken , 
            status:"Login success"
        }
        return verifiedReviewer
    }
}