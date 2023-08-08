import { createAdvisorUsecase, getAllAdvisorUsecase } from "../../../app/usecase/admin/advisor/createAdvisor"
import { setPasswordUsecaseAdvisor } from "../../../app/usecase/advisor/setPassword"
import { advisorModel } from "../../../infra/database/model/advisor/advisor"
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository"
import { Request,Response } from "express"
import { AppError } from "../../../utils/error"
import { blockAdvisorUsecase } from "../../../app/usecase/admin/advisor/block-unblock"
import { advisorProfileUsecase } from "../../../app/usecase/advisor/advisorProfile"
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


export const getAllAdvisorSearchFilterSortController =async (req:Request , res : Response) => {
    try {
        const advisorList = await getAllAdvisorUsecase(advisorRepository)()
        res.status(200).json(advisorList)
    } catch (error) {
        
    }    
}

export const blockAdvisorController =async (req:Request , res : Response) => {
    try {
        const userId:string | undefined = req.body.id as string
        const action:string | undefined = req.body.action as string
        console.log(userId , action);
        
        
        if(!userId || !action) throw new AppError("Not found" , 404)
        const blocked = await blockAdvisorUsecase(advisorRepository)(userId , action)
        if(blocked === null) throw new AppError("somthing went wrong while fetch the users" ,500)
        if(blocked === true){
            res.status(200).json({ message: 'User blocked succesfully' })
            return
        }else if(blocked===false){
            res.status(200).json({ message: 'User unblocked succesfully' })
            return
        }
    } catch (error : any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const advisorProfileController =async (req:Request , res : Response) => {
    try {
        const userId : string | undefined = req.body.id as string
        const advisorData : Object = {
            name : req.body.name as string ,
            number : req.body.number as string , 
            address :  req.body.address as string ,
            dob : req.body.dob as Date , 
            sex : req.body.sex as string , 
            education: req.body.education as string , 
        }
        const advisor = await advisorProfileUsecase(advisorRepository)(userId , advisorData)
        console.log(advisor);
        if(advisor)  res.status(200).json(advisor)

        else  res.status(200).json({ message: 'User failed' })
        


    } catch (error) {
        
    }
    
}