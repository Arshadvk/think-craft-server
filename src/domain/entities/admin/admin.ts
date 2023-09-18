import jwt from "jsonwebtoken";
import { AppError } from "../../../utils/error.js";
import { isPasswordCorrect } from "../../service/hashing.js";
import { adminLoginType } from "../../../interface/controller/admin/adminLogin.js";



export const adminLogin = (passwordCompare:Function , createToken:Function)=>{
    return async (admin:adminLoginType , adminData:adminLoginType):Promise<string>=>{
        const {email , password} = admin
        if(!email || !password||/^\s*$/.test(email)|| /^\s*$/.test(password)){
            throw new AppError ("All fields are requred",400)
        } 
        const isPasswordCorrect = await passwordCompare(password,adminData.password)
        if (!isPasswordCorrect) {
            throw new AppError("Incorrect password",401)
        }
        const token:string = createToken(adminData)
        return token
    }
}

export const createToken = (admin:string):string=>{
    const secretKey:string | undefined = process.env.JWT_SECRET_KEY
    if (!secretKey) throw new AppError("JWT secret key is not defiend" ,401);
    console.log(secretKey);
    
    const token = jwt.sign({admin , role:"admin"},secretKey as string ,{expiresIn:"1day"})
    return token
    
}

export const adminLoginValidate = adminLogin(isPasswordCorrect, createToken)