import { Domain, validateDomainData } from "../../../../domain/entities/admin/domain";
import { DomainRepository } from "../../../../infra/repositories/domain/domainRepository";
import { AppError } from "../../../../utils/error";

export const addDomainUseCase = (domainRepository:DomainRepository)=>{
  return  async(domainName:string):Promise<Domain |any >=>{
        const domainNameValidate:string = validateDomainData(domainName)
        const isDomainExist:Domain|any  = await domainRepository.findDomainByName(domainName)
        if(isDomainExist) throw new AppError ("The Domain is already exist" , 409)
        console.log(isDomainExist);
        
        const newDomain : Domain | any  = await domainRepository.createNewDomain(domainNameValidate)
        return newDomain
    }
}