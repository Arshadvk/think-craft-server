import { Request, Response } from "express";
import { getStudentProfileUsecase, studentProfileUsecase } from "../../../app/usecase/student/studentProfile";
import { studentModel } from "../../../infra/database/model/student/student";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { CustomRequest } from "../../middlewares/authMiddleware";

const studentRepository = studentRepositoryImpl(studentModel)

export const studentProfileController = async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.body.id as string
        const studentData: Object = {
            name: req.body.name as string,
            number: req.body.number as string,
            address: req.body.address as string,
            fatherName: req.body.fatherName as string,
            motherName: req.body.motherName as string,
            fatherNumber: req.body.fatherNumber as string,
            motherNumber: req.body.motherNumber as string,
            guardianName: req.body.guardianName as string,
            guardianNumber: req.body.guardianNumber as string
        }
        const student = await studentProfileUsecase(studentRepository)(userId, studentData)
        console.log(student);

        if (student) res.status(200).json({ message: 'update' })

        else res.status(200).json({ message: 'User failed' })

    } catch (error: any) {

        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
}

export const getStudentProfileController =async (req:CustomRequest , res: Response) => {

    try {
        const studentId =  req.body.id as string
        console.log(studentId);
        
        
        const student = await getStudentProfileUsecase(studentRepository)(studentId)

        res.status(200).json({data:student})

        
    } catch (error : any) {
        
        
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
    
}