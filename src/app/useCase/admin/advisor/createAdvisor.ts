import { AdvisorRepository } from "../../../../infra/repositories/advisor/advisorRepository";
import { AppError } from "../../../../utils/error";
import { SendMail } from "../../../../utils/nodemailer";



export const createAdvisorUsecase = (advisorRepository: AdvisorRepository) => {
    return async function (advisorData: any): Promise<any | null> {
        console.log('hfbhsfb');
        
        const isAdvisor = await advisorRepository.findAdvisorByEmail(advisorData.email);
       console.log(isAdvisor);
       
        if (isAdvisor) throw new AppError("Advisor is already exist", 409);
        const newAdvisor = await advisorRepository.createAdvisor(advisorData);
        console.log(newAdvisor);
        
        const sendMail = SendMail(advisorData,"advisor");
        console.log(sendMail);
        
    }
}