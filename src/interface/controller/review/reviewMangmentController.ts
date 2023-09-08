import {Request , Response} from "express"
import { CustomRequest } from "../../middlewares/authMiddleware"
import ReviewRepositoryIMPL, { filterReview, mark, updateValue } from "../../../infra/repositories/review/reviewRepository"
import { UpdateMarkUsecase, createReviewUsecase, findOneReviewDetailsUseCase, findOneReviewUsecase, findReviewAndUpdateUsecase, getReviewListUseCase } from "../../../app/usecase/review/reviewUsecase"
import { reviewModel } from "../../../infra/database/model/review/review"
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository"
import { studentModel } from "../../../infra/database/model/student/student"
import { ObjectId } from "mongoose"
import { json } from "body-parser"
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository"
import { advisorModel } from "../../../infra/database/model/advisor/advisor"
import { Review, reviews } from "../../../domain/entities/review/review"
import moment from "moment"


export type updateReviewData = {
    reviewer?: string
    mark : object 
    pendingTask : [string]
}
const reviewRepository = ReviewRepositoryIMPL(reviewModel)
const advisorRepository = AdvisorRepositoryImpl(advisorModel)
const studentRepository = studentRepositoryImpl(studentModel)
export const findReviewController =async (req:CustomRequest , res : Response) => {
    try {
        const type : string | undefined = req.query.type as string 
        console.log("first"+type);
        
        const advisor : string | undefined = req.user?.advisor?._id as string
        const reviewer : string | undefined =  req.user?.reviewer?._id   as string 
        const student : ObjectId | undefined = req.query.id as unknown as ObjectId
        let filterData : filterReview = {}
        if (advisor) {
            if (type ) {
                filterData.type = type 
            }
            filterData.advisor =  advisor  
        }else if (reviewer) {
            filterData.reviewer = reviewer 
        }
       if (student){
            filterData.student = student 
        }
        console.log("filter" , filterData);
        
        const reviews = await getReviewListUseCase(reviewRepository)(filterData)        
        res.status(200).json(reviews)
       
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
    
}

export const findOneReviewController =async (req:CustomRequest , res : Response) => {
    try {
        const userId : string = req.user?.student?._id 
        const week : number | undefined = req.query.week as unknown as number 
        const review = await findOneReviewUsecase(reviewRepository , studentRepository)(userId , week)
      console.log(review);
        
        res.status(200).json(review)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
    
}

export const updateReviewController =async (req :Request , res : Response ) => {
    try {
        console.log(req.body);
        let data : updateValue = {}
        const mark : mark | undefined = req.body?.mark 
        if (mark) {
            data.mark = mark
        }
        const pendingTask : [] | undefined = req.body.pendingTopic
        if (pendingTask) {
            data.pendingTask  = pendingTask
        }
        const weekStatus: string = req.body.weekStatus as string   
        if (weekStatus){
            data.weekStatus = weekStatus
        }
        
        const student  : string = req.body?.student as string
        const week : number = req.body.week as number

        const updatedReview = await UpdateMarkUsecase(reviewRepository)(student , week , data )
        console.log(mark);
        if (updatedReview && data.weekStatus === 'Week Repeat') {
            
        }
        else {
            const review : reviews = {
                date :  moment().add(8, 'days').toDate() ,
                week : week+1
            }
            
            const newReview = await createReviewUsecase(reviewRepository , advisorRepository , studentRepository)(student , review )
        }
        res.status(200).json(updatedReview)

    }  catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
}

export const findOneReviewDetailsController =  async (req:Request , res : Response) => {
 try {
    const reviewsId = req.params.id as string
    console.log(reviewsId);
    
    const review : Review | null= await findOneReviewDetailsUseCase(reviewRepository)(reviewsId)

    res.status(200).json(review)

 } catch (error : any) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
            
 }   
}