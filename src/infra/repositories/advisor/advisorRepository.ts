import { ObjectId } from "mongoose"
import { AppError } from "../../../utils/error.js"
import { Filter } from "../../../interface/controller/reviewer/reviewerManagment.js"
import { MongoDBAdvisor, advisorModel, } from "../../database/model/advisor/advisor.js"



export type AdvisorRepository = {
    createAdvisor: (advisorData: any) => Promise<any>
    findAdvisorByEmail: (email: string) => Promise<any >
    setAdvisorPassword:(id:string, password:string)=>Promise<any>
    getAllAdvisor:(filterData : Filter)=>Promise<object[]>
    updateIsBlock:(userId : string , action : string) => Promise <boolean | undefined >
    updateAdvisorProfile :(userId : string , advisorData : object) => Promise <any | null >
    findAdvisorById:(userId:string)=> Promise <any>
    findAvilableAdvisor : ()=>Promise<ObjectId[]>
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
    const getAllAdvisor = async(filterData : Filter):Promise<object[]>=>{
        if (filterData.search) {
            const allAdvisors = await advisorModel.find(filterData.search)
            return allAdvisors
            
        }else{
            const allAdvisors = await advisorModel.find(filterData)
            return allAdvisors
        }
        
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
    const findAvilableAdvisor =async ():Promise<ObjectId[]> => {
        const advisors = await advisorModel.find({}, { _id: 1 });

        const advisorIds: ObjectId[] = advisors.map((advisor) => advisor._id);
        return advisorIds;
    }
    return {
         createAdvisor,
         findAdvisorByEmail ,
         setAdvisorPassword  , 
         getAllAdvisor , 
         updateIsBlock , 
         updateAdvisorProfile ,
         findAdvisorById ,
         findAvilableAdvisor 
        }
}
export default AdvisorRepositoryImpl