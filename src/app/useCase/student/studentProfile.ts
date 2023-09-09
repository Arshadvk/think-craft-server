import { ObjectId } from "mongoose";
import { Student } from "../../../domain/entities/student/student";
import { StudentRepository } from "../../../infra/repositories/student/studentRepository";

 export const studentProfileUsecase = (studentRepository : StudentRepository)=>{
    return async (userId : ObjectId , studentData:object):Promise<any | null >=>{
        
        const student = await studentRepository.updateStudentProfile(userId, studentData)
        return student
    }
 }

 export const getStudentProfileUsecase = (studentRepository:StudentRepository)=>{
    return async(userId:string):Promise<any>=>{
        const student = await studentRepository.findStudentById(userId)
        return student
    }
 }