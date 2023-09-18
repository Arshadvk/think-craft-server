import { AppError } from "../../../../utils/error.js";
import { sendMail } from "../../../../domain/service/email_send.js";
import { Filter } from "../../../../interface/controller/reviewer/reviewerManagment.js";
import { ReviewerRepository } from "../../../../infra/repositories/reviewer/reviewerRepository.js";
import { Reviewer, createReviewerToken } from "../../../../domain/entities/reviewer/reviewer.js";



export const createReviewerUsecase = (reviewerRepository : ReviewerRepository)=>{
    return async (reviwerData:any):Promise<any | null> =>{
        console.log("fgasdvg");
        
        const isReviewer = await  reviewerRepository.findReviewerByEmail(reviwerData.email)
        if (isReviewer) throw new AppError("Revieweer is already exist" ,409)
        const newReviewer  = await reviewerRepository.createReviewer(reviwerData)
        console.log(newReviewer);
        const token = createReviewerToken(newReviewer)
        const sended = sendMail(newReviewer , "/reviewer" ,token )
        
        
    }
}
export const getAllReviewerUsecase = (reviewerRepository:ReviewerRepository)=>{
    return async (filterData : Filter ):Promise <Object[]>=>{
        const allReviewer = await reviewerRepository.getAllReviewer(filterData)
        return allReviewer
    }
}