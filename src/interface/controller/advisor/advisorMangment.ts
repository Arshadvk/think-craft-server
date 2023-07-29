import { createAdvisorUsecase } from "../../../app/useCase/admin/advisor/createAdvisor"
import { setPasswordUsecaseAdvisor } from "../../../app/useCase/advisor/setPassword"
import { advisorModel } from "../../../infra/database/model/advisor/advisor"
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository"
import { Request,Response } from "express"
const advisorRepository = AdvisorRepositoryImpl(advisorModel)

export const createAdvisorController = async(req:Request, res:Response)=>{
    try {

        const advisorData = req.body
        console.log(req.body);
        const newAdvisor = await createAdvisorUsecase(advisorRepository)(advisorData)
        res.status(200).send({message:"advisor created succussfully"})
    } catch (error) {
        
    }
}

export const passwordCreationAdvisor = async (req:Request , res: Response)=>{
    try {
        const advisorData = req.body
        const newPassword = await setPasswordUsecaseAdvisor(advisorRepository)(advisorData)
        res.status(200).send({message:"password change successfully"})
     } catch (error) {
        
    }
}