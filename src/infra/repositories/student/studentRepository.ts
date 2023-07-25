import { MongoDBStudent, studentModel } from "../../database/model/student/student";

export type StudentRepository = {
    createStudent:(studentData:any)=>Promise<any | null>
    findStudentByEmail:(email:string)=>Promise<any | null>
}


const studentRepositoryImpl=(StudentModel : MongoDBStudent):StudentRepository=>{
    const createStudent = async (studentData:any):Promise<any |null> =>{
        const newStudent = await studentModel.create(studentData)
        return newStudent
    }
    const findStudentByEmail = async(email:string):Promise<any|null> =>{
        const student = await studentModel.findOne({email})
        return student
    }
    return { createStudent , findStudentByEmail}
}

export default studentRepositoryImpl