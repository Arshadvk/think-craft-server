import { StudentRepository } from "../../../../infra/repositories/student/studentRepository"

export const getAllStudentUseCase = (studentRepository: StudentRepository)=>{
    return async ():Promise <Object[]>=>{
        const allStudent = await studentRepository.getAllStudents()
        return allStudent
    }
}
 