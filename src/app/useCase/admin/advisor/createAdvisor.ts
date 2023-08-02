import { sendMail } from "../../../../domain/service/email_send";
import { AdvisorRepository } from "../../../../infra/repositories/advisor/advisorRepository";
import { AppError } from "../../../../utils/error";




export const createAdvisorUsecase = (advisorRepository: AdvisorRepository) => {
    return async function (advisorData: any): Promise<any | null> {
       
        const isAdvisor = await advisorRepository.findAdvisorByEmail(advisorData.email);
   
       
        if (isAdvisor) throw new AppError("Advisor is already exist", 409);
        const newAdvisor = await advisorRepository.createAdvisor(advisorData);
        console.log(newAdvisor);
        
        const sended = sendMail(advisorData,"/advisor");
        console.log(sended);
        
    }
}

export const getAllAdvisorUsecase = (advisorRepository : AdvisorRepository)=>{
    return async ():Promise <Object[]>=>{
        const allAdvisor = await advisorRepository.getAllAdvisor()
        return allAdvisor
    }
}