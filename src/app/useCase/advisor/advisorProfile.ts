import { AdvisorRepository } from "../../../infra/repositories/advisor/advisorRepository";

export const advisorProfileUsecase = (advisorRepository : AdvisorRepository)=>{
    return async (userId : string , advisorData : object): Promise <any | null > =>{
        const advisor = await advisorRepository.uodateAdvisorProfile(userId , advisorData)
        return advisor 
    }
}