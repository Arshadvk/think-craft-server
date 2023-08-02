import { AdvisorRepository } from "../../../../infra/repositories/advisor/advisorRepository";

export const blockAdvisorUsecase = (advisorRepository : AdvisorRepository)=>{
    return async (userId : string , action : string):Promise <Boolean | undefined>=>{
        const advisor = await advisorRepository.updateIsBlock(userId , action)
        return advisor
    }
}