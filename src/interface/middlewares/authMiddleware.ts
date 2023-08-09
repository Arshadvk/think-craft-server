import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

export interface CustomRequest extends Request {
    user?: any
}

const StudentAuthenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader: any | undefined = req.headers.authorization;
        console.log(authHeader);
        
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY_STUDENT
        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
        }
        let token = JSON.parse(authHeader)
        console.log("uggygy");
        token = token.Token as string
        console.log(token);
        
        jwt.verify(token, secretKey as string, (err :any, user :any) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'not hello !', Auth: false })
            }
            req.user = user;
            next();
        })
    } catch (error) {
        res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
    }

}

export const adminAuthToken = (req : CustomRequest , res: Response , next : NextFunction)=>{
    try {
        const authHeader: string | undefined = req.headers.authorization;
        console.log(authHeader);
        
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY_ADMIN
        console.log(secretKey);
        
        if (!authHeader || !secretKey) {
            
            
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
        }
        // const token:string = JSON.parse(authHeader).Token
        // console.log(typeof token, token);
        
        jwt.verify(authHeader, secretKey , (err :any, user : any) => {
            if (err) {
                console.log(err);
                
                return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
            }else{

                console.log(user,99);
            }
            
            req.user = user;
            next();
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
        
    }
}


export default  StudentAuthenticateToken