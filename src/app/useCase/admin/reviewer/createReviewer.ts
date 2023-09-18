import { AppError } from "../../../../utils/error";
import { sendMail } from "../../../../domain/service/email_send";
import { Filter } from "../../../../interface/controller/reviewer/reviewerManagment";
import { ReviewerRepository } from "../../../../infra/repositories/reviewer/reviewerRepository";
import { Reviewer, createReviewerToken } from "../../../../domain/entities/reviewer/reviewer";



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