import { AdvisorRepository } from "../../../infra/repositories/advisor/advisorRepository";

export const advisorProfileUsecase = (advisorRepository : AdvisorRepository)=>{
    return async (userId : string , advisorData : object): Promise <any | null > =>{
        const advisor = await advisorRepository.updateAdvisorProfile(userId , advisorData)
        return advisor 
    }
}

export const getAdvisorProfileUsecase = (advisorRepository: AdvisorRepository)=>{
    return async (userId : string ):Promise <any>=>{
        const advisor = await advisorRepository.findAdvisorById(userId)
        return advisor
    }
}