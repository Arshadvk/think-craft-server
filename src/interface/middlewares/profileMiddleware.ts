import { NextFunction, Response } from "express"; 
import { CustomRequest } from "./authMiddleware";
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

export const studentProfileMiddleware = (req : CustomRequest , res : Response , next : NextFunction )=>{
    try {
        const studentToken : string | undefined = req.params.id 
        const secretKey  : string | undefined = process.env.JWT_SECRET_KEY
        if (!studentToken || !secretKey){
            return res.status(401).json({success:false ,message: 'no token' , Auth:false})
        }
        jwt.verify(studentToken , secretKey as string , (err:any, user : any)=>{
            if(err){
                return res.status(401).json({success: false , message : 'invalid token' , Auth : false })
            }else if (user){
                console.log(user);
                
                if(user?.role === 'student'){
                    req.user = user;

                }else{
                    return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
                }
            }
            next();
        })

    } catch (err) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })

    }
}

export const advisorProfileMiddleware = (req : CustomRequest , res : Response , next : NextFunction )=>{
    try {
        const advisorToken : string | undefined = req.params.id 
        const secretKey  : string | undefined = process.env.JWT_SECRET_KEY
        if (!advisorToken || !secretKey){
            return res.status(401).json({success:false ,message: 'no token' , Auth:false})
        }
        jwt.verify(advisorToken , secretKey as string , (err:any, user : any)=>{
            if(err){
                return res.status(401).json({success: false , message : 'invalid token' , Auth : false })
            }else if (user){
                if(user?.role === 'advisor'){
                    req.user = user;
                }else{
                    return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
                }
            }
            next();
        })

    } catch (err) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })

    }
}

export const reviewerProfileMiddleware = (req : CustomRequest , res : Response , next : NextFunction )=>{
    try {
        const reviewerToken : string | undefined = req.params.id 
        const secretKey  : string | undefined = process.env.JWT_SECRET_KEY
        if (!reviewerToken || !secretKey){
            return res.status(401).json({success:false ,message: 'no token' , Auth:false})
        }
        jwt.verify(reviewerToken , secretKey as string , (err:any, user : any)=>{
            if(err){
                return res.status(401).json({success: false , message : 'invalid token' , Auth : false })
            }else if (user){
                if(user?.role === 'reviewer'){
                    req.user = user;
                }else{
                    return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
                }
            }
            next();
        })

    } catch (err) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })

    }
}