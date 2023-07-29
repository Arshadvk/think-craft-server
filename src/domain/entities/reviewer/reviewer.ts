import { reviewerLoginType } from "../../../interface/controller/reviewer/reviewerLoginController"
import { AppError } from "../../../utils/error"
import jwt  from "jsonwebtoken"
import { isPasswordCorrect } from "../../service/hashing"

export type Reviewer = {
    name:string
    email:string
    password:string
    number:string
    image:string
    address:string;
    dob:Date;
    isBlocked:boolean;
    sex:string;
    domain:string;
}

export const reviewerLogin = (passwordCompare:Function , createToken:Function)=>{
    return async (reviewer : reviewerLoginType , reviewerData : reviewerLoginType):Promise<string>=>{
        const {email , password } = reviewer
        if(!email || !password||/^\s*$/.test(email)|| /^\s*$/.test(password)){
            throw new AppError ("All fields are requred",400)
        }
        const isPasswordCorrect = await passwordCompare(password,reviewerData.password)
        if (!isPasswordCorrect) {
            throw new AppError("Incorrect password",401)
        }
        console.log(isPasswordCorrect);
        
        const token:string = createAdvisorToken(reviewerData)
        console.log(token);
        
        return token
    }
}
export const createAdvisorToken = (advisor : reviewerLoginType):string=>{
    const secretKey : string | undefined = process.env.JWT_SECRET_KEY_REVIEWER
    if ( !secretKey) {
        throw new Error('jwt secret key  is not defined')
        
    }
    const token = jwt.sign({advisor},secretKey as string , {expiresIn:'1h'})
        return token
}
export const reviewerLoginValidate = reviewerLogin(isPasswordCorrect,createAdvisorToken)