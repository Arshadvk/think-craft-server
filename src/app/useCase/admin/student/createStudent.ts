import { StudentRepository } from "../../../../infra/repositories/student/studentRepository"
import { AppError } from "../../../../utils/error";
import { SendMail } from "../../../../utils/nodemailer";


export const createStudentUsecase = (studentRepository: StudentRepository) => {

   return async (studentData: any):Promise<string | null > => {
        

        
        console.log(studentData);
        
        const isStudent = await studentRepository.findStudentByEmail(studentData.email)
        if (isStudent) throw new AppError("Student is already exist", 409)
        const newStudent = await studentRepository.createStudent(studentData)
        const sendMail = SendMail(studentData,"student")
        console.log(sendMail);
        
        return newStudent
    }


}
