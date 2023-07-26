import { MongoDBReviewer,reviewerModel } from "../../database/model/reviewer/reviewer";

export type ReviewerRepository ={
    createReviewer:(reviewerData:any)=>Promise<any | null>
    findReviewerByEmail:(email:string)=>Promise<any | null>
    
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
    return {createReviewer, findReviewerByEmail}
}

export default reviewerRepositoryImpl