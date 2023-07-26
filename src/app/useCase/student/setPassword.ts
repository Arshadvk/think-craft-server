import { Student } from "../../../domain/entities/student/student"
import { passwordHashing } from "../../../domain/service/hashing"
import { StudentRepository } from "../../../infra/repositories/student/studentRepository"



export const setPasswordUsecase = (studentRepository: StudentRepository) => {
    return async (studentData: any): Promise<Student | null> => {
        const password = await passwordHashing(studentData.password)
        const student = await studentRepository.setStudentPassword(studentData.email, password)
        return student
    }
}