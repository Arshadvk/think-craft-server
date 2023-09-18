import { MongoDbAdmin, adminModel } from "../../database/model/admin/admin";

export type AdminRepository={
    setAdminPassword:(emaildminId:string , password:string)=>Promise<Object|null>
    findAdminById : (email:string)=>Promise<object | null >
    createAdmin : (adminData:any)=>Promise <any> 
    findAdminByEmail : (adminData:any)=>Promise <any> 
}
const AdminRepositoryImpl = (AdminModel:MongoDbAdmin):AdminRepository=>{
   
    const createAdmin =async (adminData:any):Promise<any> => {
        const newAdmin = await adminModel.create(adminData)
        return newAdmin
    }
    const  setAdminPassword = async (email:string , password:string):Promise<Object | null > => {
        console.log(password+"arshad");
        console.log(email);
        
        const admin = await adminModel.updateOne({email:email},{$set:{password:password}})
        console.log(admin);
        
        return admin 
    }
    const findAdminById = async (id:string):Promise<any| null> => {
        const admin = await adminModel.findById({id})
        return admin
    }
    const findAdminByEmail =async (email:string):Promise<any> => {
        const admin = await adminModel.findOne({email})
        return admin
    }
    return{setAdminPassword , findAdminById , createAdmin , findAdminByEmail}
}

export default AdminRepositoryImpl