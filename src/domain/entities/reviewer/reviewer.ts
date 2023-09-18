import jwt  from "jsonwebtoken"
import { AppError } from "../../../utils/error.js"
import { isPasswordCorrect } from "../../service/hashing.js"
import { reviewerLoginType } from "../../../interface/controller/reviewer/reviewerLoginController.js"

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
      
        
        const token:string = createReviewerToken(reviewerData)
     
        
        return token
    }
}
export const createReviewerToken = (reviewer : reviewerLoginType):string=>{
    const secretKey : string | undefined = process.env.JWT_SECRET_KEY
    if ( !secretKey) {
        throw new Error('jwt secret key  is not defined')
        
    }
    const token = jwt.sign({reviewer , role:'reviewer'},secretKey as string , {expiresIn:'1day'})
        return token
}
export const reviewerLoginValidate = reviewerLogin(isPasswordCorrect,createReviewerToken)