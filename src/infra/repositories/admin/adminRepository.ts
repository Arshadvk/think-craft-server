import { MongoDbAdmin, adminModel } from "../../database/model/admin/admin";

export type AdminRepository={
    setAdminPassword:(email:string , password:string)=>Promise<Object|null>
    findAdminByEmail : (email:string)=>Promise<object | null > 
}
const AdminRepositoryImpl = (AdminModel:MongoDbAdmin):AdminRepository=>{
    const  setAdminPassword =async (email:string , password:string):Promise<Object | null > => {
        const admin = await adminModel.updateOne({email:email},{$set:{password:password}})
        return admin   
    }
    const findAdminByEmail =async (email:string):Promise<Object| null> => {
        const admin = adminModel.findOne({email})
        return admin
    }
    return{setAdminPassword , findAdminByEmail}
}

export default AdminRepositoryImpl