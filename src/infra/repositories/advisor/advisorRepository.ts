import { MongoDBAdvisor, advisorModel, } from "../../database/model/advisor/advisor"



export type AdvisorRepository = {
    createAdvisor: (advisorData: any) => Promise<any | null>
    findAdvisorByEmail: (email: string) => Promise<any | null>
    setAdvisorPassword:(email:string, password:string)=>Promise<any|null>
    getAllAdvisor:()=>Promise<object[]>
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
    return { createAdvisor, findAdvisorByEmail ,setAdvisorPassword  , getAllAdvisor}
}
export default AdvisorRepositoryImpl