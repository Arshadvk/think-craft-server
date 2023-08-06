import { Student } from "../../../domain/entities/student/student";
import { StudentRepository } from "../../../infra/repositories/student/studentRepository";

 export const studentProfileUsecase = (studentRepository : StudentRepository)=>{
    return async (userId : string , studentData:object):Promise<any | null >=>{
        const student = await studentRepository.updateStudentProfile(userId, studentData)
        return student
    }
 }

 export const getStudentProfileUsecase = (studentRepository:StudentRepository)=>{
    return async(userId:string):Promise<any>=>{
        console.log("kdsfj");
        
        const student = await studentRepository.findStudentById(userId)
        return student
    }
 }