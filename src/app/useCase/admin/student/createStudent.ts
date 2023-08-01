import { sendMail } from "../../../../domain/service/email_send";
import { StudentRepository } from "../../../../infra/repositories/student/studentRepository"
import { AppError } from "../../../../utils/error";


export const createStudentUsecase = (studentRepository: StudentRepository) => {

   return async (studentData: any):Promise<string | null > => {
        

        
        console.log(studentData);
        
        const isStudent = await studentRepository.findStudentByEmail(studentData.email)
        if (isStudent) throw new AppError("Student is already exist", 409)
        const newStudent = await studentRepository.createStudent(studentData)
        const sended = sendMail(studentData,"")
        return newStudent
    }


}

export const getAllStudentUseCase = (studentRepository: StudentRepository)=>{
    return async ():Promise <Object[]>=>{
        const allStudent = await studentRepository.getAllStudents()
        return allStudent
    }
}