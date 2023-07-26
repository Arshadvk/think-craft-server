import { ReviewerRepository } from "../../../../infra/repositories/reviewer/reviewerRepository";
import { AppError } from "../../../../utils/error";
import { SendMail } from "../../../../utils/nodemailer";


export const createReviewerUsecase = (reviewerRepository : ReviewerRepository)=>{
    return async (reviwerData:any):Promise<any | null> =>{
        console.log("fgasdvg");
        
        const isReviewer = await  reviewerRepository.findReviewerByEmail(reviwerData.email)
        if (isReviewer) throw new AppError("Revieweer is already exist" ,409)
        const newReviewer  = await reviewerRepository.createReviewer(reviwerData)
        console.log(newReviewer);
        
        const sendMail = SendMail(reviwerData , "reviewer")
        console.log(sendMail);
        
    }
}