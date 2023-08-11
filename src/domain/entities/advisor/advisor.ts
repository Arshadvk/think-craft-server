import jwt from "jsonwebtoken"
import { advisorLoginType } from "../../../interface/controller/advisor/advisorLoginController"
import { AppError } from "../../../utils/error"
import { isPasswordCorrect } from "../../service/hashing"

export type Advisor = {
    name:string
    email:string
    password:string
    number:string
    image:string
    address:string;
    dob:Date;
    isBlocked:boolean;
    sex:string;
}

export const advisorLogin = (passwordCompare:Function , createToken: Function)=>{
    return async (advisor : advisorLoginType , advisorData : advisorLoginType):Promise<string>=>{
        const {email, password } = advisor
        if(!email || !password||/^\s*$/.test(email)|| /^\s*$/.test(password)){
            throw new AppError ("All fields are requred",400)
        }
        const isPasswordCorrect = await passwordCompare(password,advisorData.password)
        if (!isPasswordCorrect) {
            throw new AppError("Incorrect password",401)
        }
        const token:string = createAdvisorToken(advisorData)
        return token
        
    }
}
export const createAdvisorToken = (advisor : advisorLoginType):string=>{
    const secretKey : string | undefined = process.env.JWT_SECRET_KEY
    if ( !secretKey) {
        throw new Error('jwt secret key  is not defined')
        
    }
    const token = jwt.sign({advisor , role:'advisor'},secretKey as string , {expiresIn:'1day'})
        return token
}

export const advisorLoginValidate = advisorLogin(isPasswordCorrect , createAdvisorToken)