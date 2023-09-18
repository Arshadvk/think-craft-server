import { AppError } from "../../../../utils/error.js";
import { sendMail } from "../../../../domain/service/email_send.js";
import { createToken } from "../../../../domain/entities/student/student.js";
import { StudentRepository } from "../../../../infra/repositories/student/studentRepository.js"


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