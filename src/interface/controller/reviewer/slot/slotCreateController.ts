import { Request, Response } from "express";
import { slotModel } from "../../../../infra/database/model/slot/slot";
import slotRepositoryImpl from "../../../../infra/repositories/slot/slot";
import { CustomRequest } from "../../../middlewares/authMiddleware";
import moment from 'moment'
import { AppError } from "../../../../utils/error";
import { createSlotUsecase, getSlotUsecase, updateSlotUsecase } from "../../../../app/usecase/reviewer/slot/slotUsecase";
import { Slot, slotes } from "../../../../domain/entities/slot/slot";
import { findReviewAndUpdateUsecase } from "../../../../app/usecase/review/reviewUsecase";
import ReviewRepositoryIMPL from "../../../../infra/repositories/review/reviewRepository";
import { reviewModel } from "../../../../infra/database/model/review/review";
import studentRepositoryImpl from "../../../../infra/repositories/student/studentRepository";
import { studentModel } from "../../../../infra/database/model/student/student";

const slotRepository = slotRepositoryImpl(slotModel)
const reviewRepository = ReviewRepositoryIMPL(reviewModel)
const studentRepository = studentRepositoryImpl(studentModel)

export const slotCreateController =async (req:CustomRequest , res : Response) => {
    try {

        const userId: string | undefined =  req.user?.reviewer?._id   as string
        console.log(userId);
        
        const date = req.body?.values?.date as string
        const startTime = req.body?.values?.timeStart as string
        const endTime = req.body?.values?.timeEnd  as string 
        const perReview = req.body?.values?.reviewTime 

        const startingTime = moment(startTime , 'h:mm A')
        const endingTime   = moment(endTime , 'h:mm A')
        const slotDate = moment (date)
        const currentDate = new Date()
        const slot : any = req.body?.values 
        console.log(slot);

        if(!slotDate || !startingTime || !endingTime || !perReview){
            throw new AppError('All fields are required' ,400)
        }
        
        const expectedEndingTime = startingTime.clone().add(perReview , 'minutes')
        if(endingTime.isSameOrBefore(expectedEndingTime)){
            throw new AppError('Ending time must be greater than starting time plus slot duration', 400);
        }
        if (endingTime.isBefore(startingTime)) {
            throw new AppError('Ending time cannot be less than starting time', 400);
        }

        const newSlot = await createSlotUsecase(slotRepository)(userId , date , startTime , endTime ,perReview)
        console.log(newSlot);
        
        res.json(newSlot)
    
        
    }  catch (error : any) {
        console.log(error);
        
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })    
    }
}

export const getSlotsController =async (req:CustomRequest , res :Response) => {
    try {
        const reviewerId = req.params.id ?? req.user?.reviewer?._id as string
        const slot:slotes[]| undefined = await getSlotUsecase(slotRepository)(reviewerId)
        res.status(200).json(slot)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
       }
}

export const bookSlotController =async (req:CustomRequest , res : Response) => {
    try {
        const values = req.body.value
        console.log(values);
        
        const slotId = values?.slot as string
        const studentId = values?.student as string
        const reviewerId =values?.reviewer as string 
        const slot : Slot | null = await updateSlotUsecase(slotRepository)( reviewerId ,slotId) 

        if (slot) {
            const review = await findReviewAndUpdateUsecase(reviewRepository , studentRepository )(studentId , reviewerId)
            console.log(review);
            
            res.status(200).json({review})
        }
        
    } catch (error : any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
        
    }
}