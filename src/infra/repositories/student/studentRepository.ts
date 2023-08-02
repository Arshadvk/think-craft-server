import { Student } from "../../../domain/entities/student/student";
import { AppError } from "../../../utils/error";
import { MongoDBStudent, studentModel } from "../../database/model/student/student";

export type StudentRepository = {
    createStudent:(studentData:any)=>Promise<any | null>
    findStudentByEmail:(email:string)=>Promise<any | null>
    setStudentPassword:(email:string,password:string)=>Promise<any | null>
    getAllStudents:()=>Promise<object[]>
    updateIsBlock :( userId:string , action : string ) => Promise < boolean | undefined >
    updateStudentProfile:( userId: string ,studentData : Student )=>Promise <any | null >
}


const studentRepositoryImpl=(StudentModel : MongoDBStudent):StudentRepository=>{
    const createStudent = async (studentData:any):Promise<any|null> =>{
        const newStudent = await studentModel.create(studentData)
        return newStudent
    }
    const findStudentByEmail = async(email:string):Promise<any|null> =>{
        const student = await studentModel.findOne({email})
        return student
    }
    const setStudentPassword = async (email:string , password:string)=>{
        const student = await studentModel.updateOne({email:email},{$set:{password:password}})
        return student
    } 
    const getAllStudents = async ():Promise<object[]>=>{
    
        const allStudent = await StudentModel.find()
        return allStudent
    }
    const updateIsBlock =async (userId:string , action : string):Promise <boolean | undefined> => {
        let isBlocked:boolean | undefined
        if (action === "block") isBlocked = true 
        if (action === "unblock") isBlocked = false 
        const student = await studentModel.findByIdAndUpdate(userId,{isBlocked}, {new : true})
        if (!student) throw new AppError('somthing went wrong when block the user ' , 500)
        return isBlocked
    }  
    const updateStudentProfile = async ( userId: string ,studentData : Student ):Promise <any | null >=>{
        const student = await studentModel.findByIdAndUpdate(userId ,{studentData}, {new: true})
        if(!student) throw new AppError('somthing went wrong when block the user ' , 500)
        return student
    }
    return { createStudent , findStudentByEmail ,setStudentPassword , getAllStudents , updateIsBlock ,updateStudentProfile }
}

export default studentRepositoryImpl