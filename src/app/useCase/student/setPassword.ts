import { Student } from "../../../domain/entities/student/student"
import { passwordHashing } from "../../../domain/service/hashing"
import { StudentRepository } from "../../../infra/repositories/student/studentRepository"



export const setPasswordUsecase = (studentRepository: StudentRepository) => {
    return async (studentData: any , userId:string ): Promise<Student | null> => {
        
        
        const password = await passwordHashing(studentData.password)
        console.log(password);
        
        const student = await studentRepository.setStudentPassword(userId, password)
        return student
    }
}