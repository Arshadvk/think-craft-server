import { Domain } from "../../../domain/entities/admin/domain";
import { MongoDBDomain, domainModel } from "../../database/model/domain/domain";


export type DomainRepository = {
    createNewDomain:(domainName:string)=>Promise<any>
    findDomainByName:(domainName:string)=>Promise<Domain| any>

}

const domainRepositoryIMPL = (DomainModel:MongoDBDomain):DomainRepository=>{
    const createNewDomain =async (domainName:string):Promise<Domain | any> => {
        const newDomain = new DomainModel({
            name : domainName,
        })
        const createdDomain = await newDomain.save()
        return createdDomain
    }
    const findDomainByName =async (domainName:string):Promise<Domain|any> => {
      const domainExist : Domain | any = await domainModel.find({domainName}) 
      return domainExist 
    }
    return{createNewDomain , findDomainByName}
}
export default domainRepositoryIMPL