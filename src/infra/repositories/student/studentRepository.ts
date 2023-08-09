import { ObjectId } from "mongoose";
import { Student } from "../../../domain/entities/student/student";
import { AppError } from "../../../utils/error";
import { MongoDBStudent, studentModel } from "../../database/model/student/student";

export type StudentRepository = {
    createStudent: (studentData: any) => Promise<any | null>
    findStudentByEmail: (email: string) => Promise<any | null>
    setStudentPassword: (id: string, password: string) => Promise<any | null>
    getAllStudents: () => Promise<object[]>
    updateIsBlock: (userId: string, action: string) => Promise<boolean | undefined>
    updateStudentProfile: (userId: string, studentData: object) => Promise<any | null>
    findStudentById:(userId : string)=> Promise <any>
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
    const getAllStudents = async (): Promise<object[]> => {

        const allStudent = await StudentModel.find()
        return allStudent
    }
    const updateIsBlock = async (userId: string, action: string): Promise<boolean | undefined> => {
        let isBlocked: boolean | undefined
        if (action === "block") isBlocked = true
        if (action === "unblock") isBlocked = false
        const student = await studentModel.findByIdAndUpdate(userId, { isBlocked }, { new: true })
        if (!student) throw new AppError('somthing went wrong when block the user ', 500)
        return isBlocked
    }
    const updateStudentProfile = async (userId: string, studentData: object): Promise<any | null> => {
        const student = await studentModel.findByIdAndUpdate(userId, studentData, { new: true })
        if (!student) throw new AppError('somthing went wrong when block the user ', 500)
        return student
    }
    const findStudentById = async (userId: string): Promise<any> => {
        const student = await studentModel.findById(userId ).populate('domain')
        return student

    }
    return {
        createStudent,
        findStudentByEmail, 
        setStudentPassword, 
        getAllStudents, 
        updateIsBlock, 
        updateStudentProfile,
        findStudentById
    }
}

export default studentRepositoryImpl