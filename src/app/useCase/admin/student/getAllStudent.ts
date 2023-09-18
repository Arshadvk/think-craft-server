import { Filter } from "../../../../interface/controller/reviewer/reviewerManagment"
import { StudentRepository } from "../../../../infra/repositories/student/studentRepository"

export const getAllStudentUseCase = (studentRepository: StudentRepository)=>{
    return async (filterData : Filter):Promise <Object[]>=>{
        const allStudent = await studentRepository.getAllStudents(filterData)
        return allStudent
    }
}
 