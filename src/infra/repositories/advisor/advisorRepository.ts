import { AppError } from "../../../utils/error"
import { MongoDBAdvisor, advisorModel, } from "../../database/model/advisor/advisor"



export type AdvisorRepository = {
    createAdvisor: (advisorData: any) => Promise<any | null>
    findAdvisorByEmail: (email: string) => Promise<any | null>
    setAdvisorPassword:(email:string, password:string)=>Promise<any|null>
    getAllAdvisor:()=>Promise<object[]>
    updateIsBlock:(userId : string , action : string) => Promise <boolean | undefined >
    uodateAdvisorProfile :(userId : string , advisorData : object) => Promise <any | null >
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
    const setAdvisorPassword = async (email:string,password:string)=>{
        const advisor = await advisorModel.updateOne({email:email},{$set:{password:password}})
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
    const uodateAdvisorProfile =async (userId:string  , reviwerData : object):Promise<any| null> => {
        const advisor = await advisorModel.findByIdAndUpdate(userId , reviwerData ,{new : true})
        if (!advisor) throw new AppError('somthing went wrong when block the user ' , 500)
        return advisor                
    }
    return { createAdvisor, findAdvisorByEmail ,setAdvisorPassword  , getAllAdvisor , updateIsBlock , uodateAdvisorProfile}
}
export default AdvisorRepositoryImpl