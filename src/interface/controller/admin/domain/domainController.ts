import { Request, Response } from "express";
import { addDomainUseCase } from "../../../../app/usecase/admin/domain/addDomain";
import domainRepositoryIMPL from "../../../../infra/repositories/domain/domainRepository";
import { domainModel } from "../../../../infra/database/model/domain/domain";


const domainRepository = domainRepositoryIMPL(domainModel)
export const addDomainController = async (req: Request, res: Response) => {
    try {
        const domainName: string = req.body.domainName
        const newDomain = await addDomainUseCase(domainRepository)(domainName)
        if(!newDomain) res.status(500).json({ message: 'Somthing went wrong' }) 
        else res.status(200).json({ message: 'domain added succesfully' })

    }catch(error:any ){
      res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
} 