import { Request, Response } from "express";
import { getStudentProfileUsecase, studentProfileUsecase } from "../../../app/usecase/student/studentProfile";
import { studentModel } from "../../../infra/database/model/student/student";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { CustomRequest } from "../../middlewares/authMiddleware";

const studentRepository = studentRepositoryImpl(studentModel)

export const studentProfileController = async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.params.id as string
        console.log(userId);
        const data : object | any  = req.body.values as object | any
        const studentData: object = {
            name: data.name as string,
            number: data.number as string,
            address: data.address as string,
            fatherName: data.fatherName as string,
            motherName: data.motherName as string,
            fatherNumber: data.fatherNumber as string,
            motherNumber: data.motherNumber as string,
            guardianName: data.guardianName as string,
            guardianNumber: data.guardianNumber as string ,
            gender: data.gender as string ,
            qualification: data.qualification,
            dob:data.dob
    
        }
        console.log(req.body);
        
        console.log(studentData);
        
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
        const studentId:string =  req.params.id 

        console.log(studentId);
        
        
        const student = await getStudentProfileUsecase(studentRepository)(studentId)

        res.status(200).json({data:student})

        
    } catch (error : any) {
        
        
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
    
}