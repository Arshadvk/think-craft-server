import { studentLoginUserValidate } from "../../../../domain/entities/student/student";
import { StudentRepository } from "../../../../infra/repositories/student/studentRepository";
import { studentLoginType } from "../../../../interface/controller/student/studentLoginController";
import { AppError } from "../../../../utils/error";

type studentReturnType={
    token:string
    status:string
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