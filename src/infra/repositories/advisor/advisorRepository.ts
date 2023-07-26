import { MongoDBAdvisor, advisorModel, } from "../../database/model/advisor/advisor"



export type AdvisorRepository ={
    createAdvisor:(advisorData:any)=>Promise<any | null>
    findAdvisorByEmail:(email:string)=>Promise<any | null>
}

const AdvisorRepositoryImpl =(AdvisorModel:MongoDBAdvisor):AdvisorRepository=>{
    const createAdvisor = async(advisorData:any):Promise<any | null>=>{
        console.log("bhdgfha");
        
        const newAdvisor = await advisorModel.create(advisorData)
        console.log(newAdvisor);
        
        return newAdvisor
    }
    const findAdvisorByEmail = async(email:string):Promise<any | null>=>{
        console.log("bhdgfhahhhhhhhhh");
        const advisor = await advisorModel.find({email})
        return advisor
    }
    return{createAdvisor , findAdvisorByEmail}
}
export default AdvisorRepositoryImpl