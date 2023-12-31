import { Request,Response } from "express"
import { AppError } from "../../../utils/error"
import { Filter } from "../reviewer/reviewerManagment"
import { CustomRequest } from "../../middlewares/authMiddleware"
import { advisorModel } from "../../../infra/database/model/advisor/advisor"
import { setPasswordUsecaseAdvisor } from "../../../app/usecase/advisor/setPassword"
import { blockAdvisorUsecase } from "../../../app/usecase/admin/advisor/block-unblock"
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository"
import { createAdvisorUsecase, getAllAdvisorUsecase } from "../../../app/usecase/admin/advisor/createAdvisor"


const advisorRepository = AdvisorRepositoryImpl(advisorModel)

export const createAdvisorController = async(req:Request, res:Response)=>{
    try {

        const advisorData = req.body
        console.log(req.body);
        const newAdvisor = await createAdvisorUsecase(advisorRepository)(advisorData)
        res.status(200).send({message:"advisor created succussfully"})
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
        
    }
}

export const passwordCreationAdvisor = async (req:CustomRequest , res: Response)=>{
    try {
        const userId : string = req.user?.advisor?._id
        const advisorData = req.body
        const newPassword = await setPasswordUsecaseAdvisor(advisorRepository)(advisorData , userId)
        res.status(200).send({message:"password change successfully"})
     } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
        
    }
}


export const getAllAdvisorSearchFilterSortController =async (req:Request , res : Response) => {
    try {
        let filterData : Filter ={}

        if(req.query.search){
            
            filterData.search = {
                $or : [ {email : {$regex: req.query.search as string , $options : 'i' } }, 
             { name:  {$regex: req.query.search as string , $options : 'i' }}
    
            ]}
        } 
        const advisorList = await getAllAdvisorUsecase(advisorRepository)(filterData )
        res.status(200).json(advisorList)
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
        
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

