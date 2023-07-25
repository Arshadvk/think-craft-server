import {Request , Response} from "express"


export const adminLogin = async(req : Request , res : Response)=>{
    try {
        const admin  = req.body
        console.log(admin.name);
        
        if(admin.name == "maxarshu7560@gmail.com"  ){
            res.status(200).json({message: "admin login successfully"})
        }else{
            res.status(200).json({message: "admin login failed"})
        } 
    } catch (error) {
        
    }
}