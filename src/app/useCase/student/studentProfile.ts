import { Student } from "../../../domain/entities/student/student";
import { StudentRepository } from "../../../infra/repositories/student/studentRepository";

 export const studentProfileUsecase = (studentRepository : StudentRepository)=>{
    return async (userId : string , studentData:Student):Promise<any | null >=>{
        const student = await studentRepository.updateStudentProfile(userId, studentData)
        return student
    }
 }