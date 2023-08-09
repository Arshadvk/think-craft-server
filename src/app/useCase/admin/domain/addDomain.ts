import { Domain, validateDomainData } from "../../../../domain/entities/admin/domain";
import { DomainRepository } from "../../../../infra/repositories/domain/domainRepository";
import { AppError } from "../../../../utils/error";

export const addDomainUseCase = (domainRepository:DomainRepository)=>{
  return  async(domainName:string):Promise<Domain |any >=>{
    console.log("ksifj");
    
        const domainNameValidate:string = validateDomainData(domainName)
        console.log(domainNameValidate);
        
       
        
        const newDomain : Domain | any  = await domainRepository.createNewDomain(domainNameValidate)
        return newDomain
    }
}