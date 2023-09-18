import { Request, Response } from "express";
import { domainModel } from "../../../../infra/database/model/domain/domain.js";
import { addDomainUseCase } from "../../../../app/usecase/admin/domain/addDomain.js";
import domainRepositoryIMPL from "../../../../infra/repositories/domain/domainRepository.js";
import { getAllDomainUsecase } from "../../../../app/usecase/admin/domain/getDomainUsecase.js";


const domainRepository = domainRepositoryIMPL(domainModel)
export const addDomainController = async (req: Request, res: Response) => {
    try {
        const name : string = req.body
        console.log(name);
        
        const newDomain = await addDomainUseCase(domainRepository)(name)
        if(!newDomain) res.status(500).json({ message: 'Somthing went wrong' }) 
        else res.status(200).json({ message: 'domain added succesfully' })

    }catch(error:any ){
      res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
} 


export const getAllDomainController =async (req:Request , res : Response ) => {
  try {
    const domains = await getAllDomainUsecase(domainRepository)()
    if(!domains) res.status(500).json({message:"no domain found"})
    else res.status(200).json(domains)
  } catch (error) {
    
  }
  
}