import { MongoDBReviewer,reviewerModel } from "../../database/model/reviewer/reviewer";

export type ReviewerRepository ={
    createReviewer:(reviewerData:any)=>Promise<any | null>
    findReviewerByEmail:(email:string)=>Promise<any | null>
    setReviewerPassword:(email:string,password:string)=>Promise<any | null>
    
}
const reviewerRepositoryImpl=(ReviewerModel:MongoDBReviewer):ReviewerRepository=>{
    const createReviewer = async (reviewerData:any):Promise<any | null >=>{
        console.log(reviewerData);
        console.log("dfsdafg");
        
        const newReviewer = await reviewerModel.create(reviewerData)
        return newReviewer
    }
    const findReviewerByEmail = async(email:string):Promise<any | null>=>{
        const reviewer = await reviewerModel.findOne({email})
        return reviewer 
    }
    const setReviewerPassword = async (email:string , password:string)=>{
        const reviewer = await reviewerModel.updateOne({email:email},{$set:{password:password}})
        return reviewer
    }
    return {createReviewer, findReviewerByEmail , setReviewerPassword }
}

export default reviewerRepositoryImpl