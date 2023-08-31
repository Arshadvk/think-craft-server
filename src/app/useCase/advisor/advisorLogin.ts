import { Advisor, advisorLoginValidate } from "../../../domain/entities/advisor/advisor"
import { AdvisorRepository } from "../../../infra/repositories/advisor/advisorRepository"
import { advisorLoginType } from "../../../interface/controller/advisor/advisorLoginController"
import { AppError } from "../../../utils/error"

type advisorReturnType ={
    token:string 
    status:string
}

export const loginAdvisor =(advisorRepository: AdvisorRepository)=>{
    return async (advisor : advisorLoginType): Promise <advisorReturnType>=>{

        
        const isAdvisorExist: Advisor | null = await advisorRepository.findAdvisorByEmail(advisor.email)
        if(!isAdvisorExist) throw new AppError("user is not exist" , 404)

        
        const AdvisorToken = await advisorLoginValidate(advisor , isAdvisorExist)
        const verifiedAdvisor ={
            token:AdvisorToken , 
            status:"advisor login successfully"
        }
        return verifiedAdvisor
    }
}