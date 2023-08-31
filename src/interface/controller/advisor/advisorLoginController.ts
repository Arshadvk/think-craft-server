import { loginAdvisor } from "../../../app/usecase/advisor/advisorLogin"
import { advisorModel } from "../../../infra/database/model/advisor/advisor"
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository"
import { Request , Response } from "express"

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