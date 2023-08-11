import { AppError } from "../../../utils/error"
import { MongoDBAdvisor, advisorModel, } from "../../database/model/advisor/advisor"



export type AdvisorRepository = {
    createAdvisor: (advisorData: any) => Promise<any>
    findAdvisorByEmail: (email: string) => Promise<any >
    setAdvisorPassword:(id:string, password:string)=>Promise<any>
    getAllAdvisor:()=>Promise<object[]>
    updateIsBlock:(userId : string , action : string) => Promise <boolean | undefined >
    updateAdvisorProfile :(userId : string , advisorData : object) => Promise <any | null >
    findAdvisorById:(userId:string)=> Promise <any>
}

const AdvisorRepositoryImpl = (AdvisorModel: MongoDBAdvisor): AdvisorRepository => {
    const createAdvisor = async (advisorData: any): Promise<any | null> => {
        const newAdvisor = await advisorModel.create(advisorData)
        return newAdvisor
    }
    const findAdvisorByEmail = async (email: string): Promise<any | null> => {
        const advisor = await advisorModel.findOne({ email })
        return advisor
    }
    const setAdvisorPassword = async (id:string,password:string)=>{
        const advisor = await advisorModel.findOneAndUpdate({_id:id},{$set:{password:password}})
        return advisor
    }
    const getAllAdvisor = async():Promise<object[]>=>{
        const allAdvisors = await advisorModel.find()
        return allAdvisors
    }
    const updateIsBlock = async(userId : string , action : string):Promise<boolean | undefined >=>{
        let isBlocked : boolean | undefined 
        if(action === "block") isBlocked = true
        if(action === "unblock" ) isBlocked = false
        const advisor = await advisorModel.findByIdAndUpdate(userId , {isBlocked} , {new : true})
        return isBlocked
    }
    const updateAdvisorProfile =async (userId:string  , reviwerData : object):Promise<any| null> => {
        console.log(userId);
        console.log(reviwerData);
        
        const advisor = await advisorModel.findByIdAndUpdate(userId , reviwerData ,{new : true})
        if (!advisor) throw new AppError('somthing went wrong when block the user ' , 500)
        return advisor                
    }
    const findAdvisorById =async (userId:string):Promise<any> => {
        const advisor = await advisorModel.findById(userId)
        return advisor
        
    }
    return {
         createAdvisor,
         findAdvisorByEmail ,
         setAdvisorPassword  , 
         getAllAdvisor , 
         updateIsBlock , 
         updateAdvisorProfile ,
         findAdvisorById
        }
}
export default AdvisorRepositoryImpl