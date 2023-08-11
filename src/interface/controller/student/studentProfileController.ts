import { Request, Response } from "express";
import { getStudentProfileUsecase, studentProfileUsecase } from "../../../app/usecase/student/studentProfile";
import { studentModel } from "../../../infra/database/model/student/student";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { Date, ObjectId } from "mongoose";

const studentRepository = studentRepositoryImpl(studentModel)

export const studentProfileController = async (req: CustomRequest, res: Response) => {
    try {
        const userId:string =  req.user?.student?._id  
        console.log(userId);
        
        const data : object | any  = req.body.values as object | any

        const studentData: object = {
            number: data.number as string,
            address: data.address as string,
            gender: data.gender as string ,
            qualification: data.qualification,
            dob:data.dob as Date,
            domain:data.domain as ObjectId ,
            isProfileVarified: true 
    
        }
        const student = await studentProfileUsecase(studentRepository)(userId, studentData)

        if (student) res.status(200).json({ message: 'update' })

        else res.status(200).json({ message: 'User failed' })

    } catch (error: any) {

        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
}

export const getStudentProfileController =async (req:CustomRequest , res: Response) => {

    try {
        const studentId:string =  req.user?.student?._id  
        const student = await getStudentProfileUsecase(studentRepository)(studentId)
        res.status(200).json({data:student})
    } catch (error : any) {
        
        
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
    
}