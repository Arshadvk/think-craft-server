import { Domain } from "../../../../domain/entities/admin/domain";
import { DomainRepository } from "../../../../infra/repositories/domain/domainRepository";

export const getAllDomainUsecase = (domainRepository:DomainRepository)=>{
    return async ():Promise<Domain | any>=>{
        const allDomain :any = await domainRepository.findAllDomain()
        return allDomain
    }
}