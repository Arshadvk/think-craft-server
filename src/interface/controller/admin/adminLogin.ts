import {Request , Response} from "express"
import { changePasswordUsecase, createAdminUsecase, loginAdmin } from "../../../app/usecase/admin/adminLogin";
import AdminRepositoryImpl from "../../../infra/repositories/admin/adminRepository";
import { adminModel } from "../../../infra/database/model/admin/admin";

export type adminLoginType = {
    email: string 
    password:string
}

const adminRepository = AdminRepositoryImpl(adminModel)



export const adminLogin = async(req : Request , res : Response)=>{
    try {
        const admin  = req.body
        console.log(admin)
        const adminToken = await loginAdmin(adminRepository)(admin)
        console.log(adminToken);
        res.status(200).json({message:adminToken})

        
    } catch (error : any) {
        console.log(error);
        
        res.status(200).json({error:error})

        
    }
}

export const passwordChangeController =async (req:Request , res : Response) => {
    try {
        const adminData = req.body
        console.log(adminData);
        
        const newPassword = await changePasswordUsecase(adminRepository)(adminData)
        res.status(200).send({message:"password change successfully"})
    } catch (error) {
        
    }
    
}
export const createAdminController =async (req:Request , res:Response) => {
    try {
        const adminData = req.body
        const newAdmin = await createAdminUsecase(adminRepository)(adminData)
        console.log(newAdmin);
        
        res.status(200).send({ message: "admin Created Successfully" })

    } catch (error) {
        
    }
    
}