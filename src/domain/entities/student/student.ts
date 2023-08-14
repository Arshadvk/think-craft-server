import { studentLoginType } from "../../../interface/controller/student/studentLoginController";
import { AppError } from "../../../utils/error";
import jwt from "jsonwebtoken"
import { isPasswordCorrect } from "../../service/hashing";

export type Student ={
    _id : string
    name:string;
    email:string;
    number:string;
    password:string;
    image:string;
    address:string;
    dob:Date;
    isBlocked:boolean;
    gender:string;
    domain:string;
    isMailVarified:boolean;
}

export const vaildateStudent =(passwordHashing:Function)=>{
   return async(student:Student)=>{
    if(student.name)throw new AppError("name is required" , 400)
    if(student.email)throw new AppError("email is required" ,400)
    if(student.number)throw new AppError("phone is required" ,400)
   } 
}

export const studentLogin =(passwordCompare:Function , createToken:Function)=>{
    return async (student:studentLoginType,studentData:studentLoginType):Promise<string>=>{
        const {email,password} = student
        if(!email || !password||/^\s*$/.test(email)|| /^\s*$/.test(password)){
            throw new AppError ("All fields are requred",400)
        }
        const isPasswordCorrect = await passwordCompare(password,studentData.password)
        if (!isPasswordCorrect) {
            throw new AppError("Incorrect password",401)
        }
        const token:string = createToken(studentData)
        return token
    }
}

export const createToken =(student:string):string=>{

    const secretKey:string | undefined = process.env.JWT_SECRET_KEY
    if (!secretKey) {
        throw new Error('JWT secret key is not defined')
    }
    const token = jwt.sign({student,role:'student'},secretKey as string ,{expiresIn:'1day'})
    return token
}
export const studentLoginUserValidate = studentLogin(isPasswordCorrect,createToken)