import { ObjectId } from "mongoose";
import { Student, studentLoginUserValidate } from "../../../domain/entities/student/student";
import { isPasswordCorrect, passwordHashing } from "../../../domain/service/hashing";
import { StudentRepository } from "../../../infra/repositories/student/studentRepository";
import { studentLoginType } from "../../../interface/controller/student/studentLoginController";
import { AppError } from "../../../utils/error";

type studentReturnType={
    token:string
    status:string
}
export type changePassType = {
    oldpass: string
    newpass : string
}
export  const loginStudent=(studentRepository:StudentRepository)=>{
    return async (student :studentLoginType):Promise<studentReturnType>=>{
        const isStudentExist:studentLoginType | null = await studentRepository.findStudentByEmail(student.email)
        if(!isStudentExist) throw new AppError("user is not exist",404)
        const StudentToken = await studentLoginUserValidate(student,isStudentExist)
        const verifiedStudent={
            token:StudentToken,
            status:"Login success"
        }
        return verifiedStudent
    }
}

export const changeStudentPassword = (studentRepository : StudentRepository)=>{
    return async (studentId : ObjectId , value :changePassType )=>{
        const isStudentExist : Student | null = await studentRepository.findStudentById(studentId)
        if(!isStudentExist) throw new AppError("user is not exist",404)
        const IsPasswordCorrect = await isPasswordCorrect(value.oldpass , isStudentExist.password )
        if(!IsPasswordCorrect) throw new AppError("Old password is not same",404)
        const hashedPassword = await passwordHashing(value.newpass)
        const updateStudent  = await studentRepository.updateStudentProfile(studentId , {password: hashedPassword})
        return updateStudent 
    }
}