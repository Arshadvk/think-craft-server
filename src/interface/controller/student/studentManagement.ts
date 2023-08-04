import { Request, Response } from "express";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { studentModel } from "../../../infra/database/model/student/student";
import { setPasswordUsecase } from "../../../app/usecase/student/setPassword";
import { createStudentUsecase} from "../../../app/usecase/admin/student/createStudent";
import { getAllStudentUseCase } from "../../../app/usecase/admin/student/getAllStudent";
import { AppError } from "../../../utils/error";
import { blockStudentUseCase } from "../../../app/usecase/admin/student/block-unblock";
import { studentProfileUsecase } from "../../../app/usecase/student/studentProfile";
import { Date } from "mongoose";



const studentRepository = studentRepositoryImpl(studentModel)

export const createStudentController = async (req: Request, res: Response) => {
    try {
        const studentData = req.body
        console.log(studentData);
        const newStudent = await createStudentUsecase(studentRepository)(studentData)
        console.log(newStudent)
        res.status(200).send({ message: "Student Created Successfully" })

    } catch (error:any) {
        console.log(error.message);
        
    }
}

export const passwordCreation = async (req: Request, res: Response) => {
    try {
        const studentData = req.body 
        const newPassword = await setPasswordUsecase(studentRepository)(studentData)
        res.status(200).send({message:"password change successfully"})


    } catch (error) {
        
    }
}

export const getAllStudentSearchFilterSortController = async (req : Request , res : Response)=>{
    try {
        const studentList = await getAllStudentUseCase(studentRepository)()
        res.status(200).json(studentList)
    } catch (error) {
        
    }
}

export const blockStudentController = async (req:Request , res : Response) => {
    try {
        const userId:string | undefined = req.body.id as string
        const action:string | undefined = req.body.action as string
        console.log(userId+"uhyugy");
        
        if(!userId || !action) throw new AppError("Not found" , 404)

        const blocked = await blockStudentUseCase(studentRepository)(userId , action)
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

export const studentProfileController =async (req:Request , res: Response) => {
    try {
        const userId:string | undefined = req.body.id as string 
        const studentData : Object ={
            name : req.body.name as string ,
            number : req.body.number as string , 
            address :  req.body.address as string ,
            fatherName : req.body.fatherName as string ,
            motherName : req.body.motherName as string ,
            fatherNumber : req.body.fatherNumber as string , 
            motherNumber : req.body.motherNumber as string, 
            guardianName : req.body.guardianName as string ,
            guardianNumber : req.body.guardianNumber as string 
        }
        const student = await studentProfileUsecase(studentRepository)(userId , studentData)
       console.log(student);
       
        if(student)  res.status(200).json({ message: 'update' })

        else  res.status(200).json({ message: 'User failed' })
    } catch (error) {
        
    }    
}