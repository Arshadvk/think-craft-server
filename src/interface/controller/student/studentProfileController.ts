import { Request, Response } from "express";
import { getStudentProfileUsecase, studentProfileUsecase } from "../../../app/usecase/student/studentProfile";
import { studentModel } from "../../../infra/database/model/student/student";
import studentRepositoryImpl from "../../../infra/repositories/student/studentRepository";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { Date, ObjectId } from "mongoose";
import { createReviewUsecase, findOneReviewUsecase } from "../../../app/usecase/review/reviewUsecase";
import ReviewRepositoryIMPL from "../../../infra/repositories/review/reviewRepository";
import { reviewModel } from "../../../infra/database/model/review/review";
import AdvisorRepositoryImpl from "../../../infra/repositories/advisor/advisorRepository";
import { advisorModel } from "../../../infra/database/model/advisor/advisor";
import { reviews } from "../../../domain/entities/review/review";
import moment from "moment";
import { createToken } from "../../../domain/entities/student/student";

const studentRepository = studentRepositoryImpl(studentModel)
const reviewRepository = ReviewRepositoryIMPL(reviewModel)
const advisorRepository = AdvisorRepositoryImpl(advisorModel)

export const studentProfileController = async (req: CustomRequest, res: Response) => {
    try {
        const userId:string =  req.user?.student?._id  
        console.log(userId);
        
        const data : object | any  = req.body.userData as object | any
        console.log(data);
        
        const studentData: object = {
            number: data.number as string,
            address: data.address as string,
            gender: data.gender as string ,
            qualification: data.qualification,
            dob:data.dob as Date,
            domain:data.domain as ObjectId ,
            isProfileVerified: true 
    
        }
        const student = await studentProfileUsecase(studentRepository)(userId, studentData)

        if (student) {
            const review : reviews = {
                date : moment().add(8, 'days').toDate() ,
                week : 1 
                
            }

            const newReview = await createReviewUsecase(reviewRepository , advisorRepository, studentRepository)(userId , review )
            const token =  createToken(student)

            res.status(200).json({ token:token })
        }

        else res.status(200).json({ message: 'User failed' })

    } catch (error: any) {

        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
}

export const getStudentProfileController =async (req:CustomRequest , res: Response) => {

    try {
        const studentId:string =  req.user?.student?._id  
        const student = await getStudentProfileUsecase(studentRepository)(studentId)
        res.status(200).json(student)
    } catch (error : any) {
        
        
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })

    }
    
}

export const getStudentHomeController =async (req:CustomRequest , res : Response) => {
    try {
        const studentId:string =  req.user?.student?._id  
        let week
        const student = await getStudentProfileUsecase(studentRepository)(studentId)
        const review = await findOneReviewUsecase(reviewRepository , studentRepository)(studentId, week  )
        res.status(200).json({student ,review})
    } catch (error : any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })
    }
    
}