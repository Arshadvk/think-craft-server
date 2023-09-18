import { AppError } from "../../../../utils/error";
import { sendMail } from "../../../../domain/service/email_send";
import { createToken } from "../../../../domain/entities/student/student";
import { StudentRepository } from "../../../../infra/repositories/student/studentRepository"


export const createStudentUsecase = (studentRepository: StudentRepository) => {
    return async (studentData: any): Promise<string | null> => {
        const isStudent = await studentRepository.findStudentByEmail(studentData.email)
        if (isStudent) throw new AppError("Student is already exist", 409)
        const newStudent = await studentRepository.createStudent(studentData)

        const token = createToken(newStudent)
        const sended = sendMail(newStudent, "" , token)

        return newStudent
    }
}