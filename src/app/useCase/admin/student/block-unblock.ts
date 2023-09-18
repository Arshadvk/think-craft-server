import { StudentRepository } from "../../../../infra/repositories/student/studentRepository.js"

export const blockStudentUseCase =(studentRepository : StudentRepository)=>{
    return async (userId : string , action : string):Promise <Boolean | undefined >=>{
        console.log(action , userId);
        
        const student = await studentRepository.updateIsBlock(userId , action)
        return student
    }
}