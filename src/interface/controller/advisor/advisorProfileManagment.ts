import { ObjectId } from "mongoose"
import {  Response } from "express"
import { CustomRequest } from "../../middlewares/authMiddleware"
import { advisorModel } from "../../../infra/database/model/advisor/advisor"
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository"
import { advisorProfileUsecase, getAdvisorProfileUsecase } from "../../../app/usecase/advisor/advisorProfile"

const advisorRepository = AdvisorRepositoryImpl(advisorModel)


export const advisorProfileController = async (req: CustomRequest, res: Response) => {
    try {

        const userId: string | undefined = req.user?.advisor?._id   as string
        const data: object | any = req.body.userData as object | any

        const advisorData: Object = {
            number: data.number as string,
            address: data.address as string,
            dob: data.dob as Date,
            gender: data.gender as string,
            qualification: data.qualification as string,
            domain: data.domain as ObjectId ,
            isProfileVerified: true 
        }

        const advisor = await advisorProfileUsecase(advisorRepository)(userId, advisorData)
        if (advisor) res.status(200).json(advisor)
        else res.status(200).json({ message: 'User failed' })
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }

}

export const getAdvisorProfileController =async (req:CustomRequest , res : Response) => {
    try {
        const userId: string | undefined = req.user?.advisor?._id as string
        const advisor = await getAdvisorProfileUsecase(advisorRepository)(userId)
        res.status(200).json(advisor)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
    
}