import { Domain } from "../../../../domain/entities/admin/domain.js";
import { DomainRepository } from "../../../../infra/repositories/domain/domainRepository.js";

export const getAllDomainUsecase = (domainRepository:DomainRepository)=>{
    return async ():Promise<Domain | any>=>{
        const allDomain :any = await domainRepository.findAllDomain()
        return allDomain
    }
}