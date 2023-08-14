import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

export interface CustomRequest extends Request {
    user?: any
}

export const StudentAuthToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        const authHeader: any | undefined = req.headers.authorization;
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY
        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
        }

        jwt.verify(authHeader, secretKey as string, (err: any, user: any) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'not hello !', Auth: false })
            } else if (user) {

                if(user.role === 'student' && user.student.isBlocked !== true){
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'this token not for student !', Auth: false }) 
                }
                console.log(user);

            }
            
            next();
        })
    } catch (error) {
        res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
    }

}

export const adminAuthToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader: string | undefined = req.headers.authorization;
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY

        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
        }
        jwt.verify(authHeader, secretKey, (err: any, user: any) => {
            if (err) {
                console.log(err);

                return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
            } else if (user) {
                
                if(user.role === 'admin'){
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'this token not for admin !', Auth: false }) 
                }
                console.log(user);

            }
            next();
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })

    }
}

export const advisorAuthToken =async ( req:CustomRequest , res : Response , next : NextFunction) => {
    try {
        const authHeader : string | undefined = req.headers.authorization;
        const secretKey : string | undefined = process.env.JWT_SECRET_KEY

        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
        }
        jwt.verify(authHeader, secretKey, (err: any, user: any) => {
            if (err) {
                console.log(err);

                return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
            } else if (user) {
                
                if(user.role === 'advisor' && user.advisor?.isBlocked !== true){
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'this token not for advisor !', Auth: false }) 
                }
                console.log(user);

            }
            
            next();
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
        
    }
    
}

export const reviewerAuthToken =async ( req:CustomRequest , res : Response , next : NextFunction) => {
    try {
        const authHeader : string | undefined = req.headers.authorization;
        const secretKey : string | undefined = process.env.JWT_SECRET_KEY

        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
        }
        jwt.verify(authHeader, secretKey, (err: any, user: any) => {
            if (err) {
                console.log(err);

                return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
            } else if (user) {
                
                if(user.role === 'reviewer' && user.reviewer?.isBlocked !== true){
                
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'this token not for reviewer !', Auth: false }) 
                }
                console.log(user);

            }
            
            next();
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
        
    }
    
}
 