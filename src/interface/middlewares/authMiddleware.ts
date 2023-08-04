import jwt  from "jsonwebtoken";
import { Response , Request , NextFunction } from "express";

export interface CustomRequest extends Request {
    user?: any
}

const StudentAuthenticateToken = (req : CustomRequest , res : Response , next: NextFunction)=>{
   const authHeader:string | undefined = req.headers.authorization;
   const secretKey :string | undefined = process.env.JWT_SECRET_KEY_STUDENT
   if(!authHeader ||!secretKey){
    return res.status(401).send({error:"No token provided"})
   }
   const token = authHeader.split(' ')[1];
   jwt.verify(token , secretKey as string , (err , user)=>{
    if(err){
        return res.status(403).json({error:"Invalid token"})
    }
    req.user = user;
    next();
   })
}

export default StudentAuthenticateToken