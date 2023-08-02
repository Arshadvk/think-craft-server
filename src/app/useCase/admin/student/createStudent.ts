import { sendMail } from "../../../../domain/service/email_send";
import { StudentRepository } from "../../../../infra/repositories/student/studentRepository"
import { AppError } from "../../../../utils/error";


export const createStudentUsecase = (studentRepository: StudentRepository) => {
    return async (studentData: any): Promise<string | null> => {
        const isStudent = await studentRepository.findStudentByEmail(studentData.email)
        if (isStudent) throw new AppError("Student is already exist", 409)
        const newStudent = await studentRepository.createStudent(studentData)
        const sended = sendMail(studentData, "")
        return newStudent
    }
}