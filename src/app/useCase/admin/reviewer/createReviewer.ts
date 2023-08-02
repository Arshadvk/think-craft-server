import { sendMail } from "../../../../domain/service/email_send";
import { ReviewerRepository } from "../../../../infra/repositories/reviewer/reviewerRepository";
import { AppError } from "../../../../utils/error";
import { Reviewer } from "../../../../domain/entities/reviewer/reviewer";



export const createReviewerUsecase = (reviewerRepository : ReviewerRepository)=>{
    return async (reviwerData:any):Promise<any | null> =>{
        console.log("fgasdvg");
        
        const isReviewer = await  reviewerRepository.findReviewerByEmail(reviwerData.email)
        if (isReviewer) throw new AppError("Revieweer is already exist" ,409)
        const newReviewer  = await reviewerRepository.createReviewer(reviwerData)
        console.log(newReviewer);
        
        const sended = sendMail(reviwerData , "/reviewer")
        
        
    }
}
export const getAllReviewerUsecase = (reviewerRepository:ReviewerRepository)=>{
    return async ():Promise <Object[]>=>{
        const allReviewer = await reviewerRepository.getAllReviewer()
        return allReviewer
    }
}