import { AppError } from "../../../utils/error";
import {  passwordHashing } from "../../../domain/service/hashing";
import { adminLoginValidate } from "../../../domain/entities/admin/admin";
import { adminLoginType } from "../../../interface/controller/admin/adminLogin";
import { AdminRepository } from "../../../infra/repositories/admin/adminRepository";

type adminReturnType = {
    token:string
    status:string
}

export const changePasswordUsecase = (adminRepository:AdminRepository)=>{
    return async (adminData:any):Promise <any>=>{
        
        
        const newPassword:string  =  await passwordHashing(adminData.password as string)
        console.log(newPassword);
        
        const changepassword = await adminRepository.setAdminPassword( adminData.email , newPassword)
        return changepassword

    }
}

export const createAdminUsecase = (adminRepository : AdminRepository)=>{
    return async (adminData:any) : Promise<string>=>{
        const newAdmin = await adminRepository.createAdmin(adminData)
        return newAdmin
    }
}

export const loginAdmin = (adminRepository:AdminRepository)=>{
    return async(admin:adminLoginType):Promise<adminReturnType>=>{
        const isAdminExist:adminLoginType | null = await adminRepository.findAdminByEmail(admin.email)
        if (!isAdminExist) throw new AppError("admin is not exist" , 404);
        const adminToken = await adminLoginValidate(admin,isAdminExist)
        const verifiedAdmin = {
            token:adminToken , 
            status:"Login success"
        }
        return verifiedAdmin
        
    }
}