import { Filter } from "../../../interface/controller/reviewer/reviewerManagment";
import { AppError } from "../../../utils/error";
import { MongoDBReviewer,reviewerModel } from "../../database/model/reviewer/reviewer";

export type ReviewerRepository ={
    createReviewer:(reviewerData:any)=>Promise<any | null>
    findReviewerByEmail:(email:string)=>Promise<any | null>
    setReviewerPassword:(id:string,password:string)=>Promise<any | null>
    getAllReviewer:(filterData : Filter)=>Promise<object[]>
    updateIsBlock:(userId:string , action:string)=>Promise <boolean | undefined>
    updateReviewerProfile :( userId: string, reviewerData : any)=> Promise <any|null>
    findReviewerById:(userId : string )=> Promise <any>
}
const reviewerRepositoryImpl=(ReviewerModel:MongoDBReviewer):ReviewerRepository=>{
    
    const createReviewer = async (reviewerData:any):Promise<any | null >=>{
        const newReviewer = await reviewerModel.create(reviewerData)
        return newReviewer
    }

    const findReviewerByEmail = async(email:string):Promise<any | null>=>{
        const reviewer = await reviewerModel.findOne({email})
        return reviewer 
    }

    const setReviewerPassword = async (id:string , password:string)=>{
        const reviewer = await reviewerModel.findByIdAndUpdate({_id : id},{$set:{password:password}})
        return reviewer
    }

    const getAllReviewer = async (filterData : Filter ):Promise<object[]> =>{
        if (filterData.search) {
            const allReviewer  = reviewerModel.find(filterData.search).populate('domain')
            return allReviewer
            
        }else{
            const allReviewer  = reviewerModel.find(filterData).populate('domain')
            return allReviewer
        }
    }

    const updateIsBlock =async (userId:string , action:string):Promise<boolean | undefined> => {
        let isBlocked:boolean | undefined
        if (action === "block" ) isBlocked = true
        if (action === "unblock") isBlocked = false
        const reviewer = await reviewerModel.findByIdAndUpdate(userId,{isBlocked} , {new:true}) 
        if (!reviewer) throw new AppError("somthing went worng when block the reviwer",500)
        return isBlocked      
    }

    const updateReviewerProfile =async (userId:string , reviewerData : object ):Promise <any | null >  => {
         const reviewer = await reviewerModel.findByIdAndUpdate(userId , reviewerData ,{new: true })
         if(!reviewer) throw new AppError('somthing went wrong when block the user ' , 500)
         return reviewer
    }
    const findReviewerById =async (userId:string):Promise <any> => {
        const reviewer = await reviewerModel.findById(userId).populate('domain')
        console.log(reviewer);
        return reviewer
        
    }
    return {
        createReviewer, 
        findReviewerByEmail , 
        setReviewerPassword , 
        getAllReviewer , 
        updateIsBlock , 
        updateReviewerProfile ,
        findReviewerById 
    }
}

export default reviewerRepositoryImpl