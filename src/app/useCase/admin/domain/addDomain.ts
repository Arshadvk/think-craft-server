import { Domain, validateDomainData } from "../../../../domain/entities/admin/domain";
import { DomainRepository } from "../../../../infra/repositories/domain/domainRepository";

export const addDomainUseCase = (domainRepository: DomainRepository) => {
  return async (domainName: string): Promise<Domain | any> => {
    const domainNameValidate: string = validateDomainData(domainName)
    const newDomain: Domain | any = await domainRepository.createNewDomain(domainNameValidate)
    return newDomain
  }
}