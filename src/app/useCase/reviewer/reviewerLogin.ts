import { AppError } from "../../../utils/error.js";
import { changePassType } from "../student/studentLogin.js";
import { isPasswordCorrect, passwordHashing } from "../../../domain/service/hashing.js";
import { Reviewer, reviewerLoginValidate } from "../../../domain/entities/reviewer/reviewer.js";
import { ReviewerRepository } from "../../../infra/repositories/reviewer/reviewerRepository.js";
import { reviewerLoginType } from "../../../interface/controller/reviewer/reviewerLoginController.js";

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

export const changeReviewerPassword = (reviewerRepository : ReviewerRepository)=>{
    return async (reviewerId : string , value :changePassType)=>{
        const isReviewerExist : Reviewer | null = await reviewerRepository.findReviewerById(reviewerId)
        if(!isReviewerExist) throw new AppError("user is not exist",404)
        const IsPasswordCorrect = await isPasswordCorrect(value.oldpass , isReviewerExist.password )
        if(!IsPasswordCorrect) throw new AppError("Old password is not same",404)
        const hashedPassword = await passwordHashing(value.newpass)
        const updateReviewer  = await reviewerRepository.updateReviewerProfile(reviewerId , {password: hashedPassword})
        return updateReviewer 
    }
}