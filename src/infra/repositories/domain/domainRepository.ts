import { Domain } from "../../../domain/entities/admin/domain.js";
import { MongoDBDomain, domainModel } from "../../database/model/domain/domain.js";


export type DomainRepository = {
    createNewDomain:(name:string)=>Promise<any>
    findDomainByName:(name:string)=>Promise<Domain| any>
    findAllDomain:()=> Promise <Domain | any>
}

const domainRepositoryIMPL = (DomainModel:MongoDBDomain):DomainRepository=>{
    const createNewDomain =async (name:string):Promise<Domain | any> => {
        console.log("mgjfsngj");
        
        const newDomain = await domainModel.create(name)
        console.log(newDomain);
        
        return newDomain
    }
    const findDomainByName =async (name:string):Promise<Domain|any> => {
      const domainExist : Domain | any = await domainModel.findOne() 
      return domainExist 
    }

    const findAllDomain =async ():Promise <Domain | any> => {
        const domain = await domainModel.find()
        return domain 
    }
    return{createNewDomain , findDomainByName ,findAllDomain }
}
export default domainRepositoryIMPL