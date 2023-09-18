import { changeAdvisorPassword, loginAdvisor } from "../../../app/usecase/advisor/advisorLogin"
import { changePassType } from "../../../app/usecase/student/studentLogin"
import { advisorModel } from "../../../infra/database/model/advisor/advisor"
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository"
import { Request , Response } from "express"
import { CustomRequest } from "../../middlewares/authMiddleware"
import { ObjectId } from "mongoose"

export type advisorLoginType ={
    email:string 
    password:string
}

const advisorRepository = AdvisorRepositoryImpl(advisorModel)

export const advisorLogin =async (req:Request , res: Response) => {
    try {
        const advisor = req.body
        const advisorToken = await loginAdvisor(advisorRepository)(advisor)
        res.status(200).json({token:advisorToken})

    } catch (error : any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}

export const advisorChangePassword =async (req:CustomRequest , res : Response) => {
    try {
        const advisor = req.user.advisor._id as string
        const value : changePassType = req.body.value
        console.log(value);
        
        const updateAdvisor = await changeAdvisorPassword(advisorRepository)(advisor , value)
        res.status(200).json(updateAdvisor)
        
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
}