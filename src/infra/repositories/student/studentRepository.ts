import { ObjectId } from "mongoose";
import { AppError } from "../../../utils/error.js";
import { Student } from "../../../domain/entities/student/student.js";
import { MongoDBStudent, studentModel } from "../../database/model/student/student.js";
import { Filter } from "../../../interface/controller/reviewer/reviewerManagment.js";

export type StudentRepository = {
    createStudent: (studentData: any) => Promise<any | null>
    findStudentByEmail: (email: string) => Promise<any | null>
    setStudentPassword: (id: string, password: string) => Promise<any | null>
    getAllStudents: (filterData : Filter) => Promise<object[]>
    updateIsBlock: (userId: string, action: string) => Promise<boolean | undefined>
    updateStudentProfile: (userId: ObjectId, studentData: object) => Promise<any | null>
    findStudentById:(userId : string| ObjectId)=> Promise <any>
    findStudentIsBlocked :(userId : string) => Promise <Boolean>
    updateStudentWeek : (userId : ObjectId , week: number ) => Promise <any>
}


const studentRepositoryImpl = (StudentModel: MongoDBStudent): StudentRepository => {
    const createStudent = async (studentData: any): Promise<any | null> => {
        const newStudent = await studentModel.create(studentData)
        return newStudent
    }
    const findStudentByEmail = async (email: string): Promise<any | null> => {
        const student = await studentModel.findOne({ email })
        return student
    }
    const setStudentPassword = async (id: string, password: string) => {
        const student = await studentModel.findByIdAndUpdate({ _id: id}, { $set: { password: password } })
        return student
    }
    const getAllStudents = async (filterData : Filter): Promise<object[]> => {
        if (filterData.search){
            const allStudent = await StudentModel.find(filterData.search).populate('domain')
            return allStudent

        }else{
            const allStudent = await StudentModel.find(filterData).populate('domain')
            return allStudent
        }
    }
    const updateIsBlock = async (userId: string, action: string): Promise<boolean | undefined> => {
        let isBlocked: boolean | undefined
        if (action === "block") isBlocked = true
        if (action === "unblock") isBlocked = false
        const student = await studentModel.findByIdAndUpdate(userId, { isBlocked }, { new: true })
        if (!student) throw new AppError('somthing went wrong when block the user ', 500)
        return isBlocked
    }
    const updateStudentProfile = async (userId: ObjectId, studentData: object): Promise<any | null> => {
        const student = await studentModel.findByIdAndUpdate(userId, studentData, { new: true })
        if (!student) throw new AppError('somthing went wrong when block the user ', 500)
        return student
    }
    const findStudentById = async (userId: string | ObjectId): Promise<any> => {
        const student = await studentModel.findById(userId ).populate('domain')
        return student

    }
    const findStudentIsBlocked = async (userId: string): Promise<boolean> => {
  
            const student : Student | null = await studentModel.findById(userId, { isBlocked: 1 });
            
            if (student?.isBlocked) {
                return true
            }
            
            return false
       
    };
    
    const updateStudentWeek = async (userId : ObjectId ,week : number  ): Promise <any> =>{
        const student : any  = await studentModel.findByIdAndUpdate(userId , {week: week} , {new : true} )
        return student 
    }
    return {
        createStudent,
        findStudentByEmail, 
        setStudentPassword, 
        getAllStudents, 
        updateIsBlock, 
        updateStudentProfile,
        findStudentById , 
        findStudentIsBlocked ,
        updateStudentWeek
    }
}

export default studentRepositoryImpl