import { passwordHashing } from "../../../domain/service/hashing";
import { AdvisorRepository } from "../../../infra/repositories/advisor/advisorRepository";


export const setPasswordUsecaseAdvisor = (advisorRepository : AdvisorRepository)=>{
    return async (advisorData : any , userId : string):Promise<any | null>=>{
        const password =  await passwordHashing(advisorData.password)
        const advisor = await advisorRepository.setAdvisorPassword(userId , password)
        return advisor
    }
}