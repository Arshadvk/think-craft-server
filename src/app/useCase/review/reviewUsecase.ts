import { ObjectId } from "mongoose";
import { AdvisorId } from "../../../domain/entities/advisor/advisor";
import { reviews } from "../../../domain/entities/review/review";
import { AdvisorRepository } from "../../../infra/repositories/advisor/advisorRepository";
import { ReviewRepository, filterReview, mark, updateValue } from "../../../infra/repositories/review/reviewRepository";
import { StudentRepository } from "../../../infra/repositories/student/studentRepository";



export const createReviewUsecase = (reviewRepository : ReviewRepository , advisorRepository : AdvisorRepository , studentRepository : StudentRepository )=>{
    return async (studentId :string , review : reviews)=>{
        const advisors: AdvisorId[] = await advisorRepository.findAvilableAdvisor()
        
        const selectedAdvisor : AdvisorId | null = getRandomAdvisor(advisors) 
        
        if (!selectedAdvisor) {
            throw new Error('No available advisors');
        }
        review.advisor  = selectedAdvisor 
        const newReview = await reviewRepository.createNewReview(studentId , review)
        const weekUpdatedStudent = await studentRepository.updateStudentWeek(studentId , review.week as number)

        return newReview
    }
}

export const getRandomAdvisor = (advisors: AdvisorId[]): AdvisorId | null => {
    if (advisors.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * advisors.length);
    return advisors[randomIndex];
};


export const getReviewListUseCase = (reviewRepository : ReviewRepository )=>{
    return async (filterData : filterReview)=>{
        const reviews = await reviewRepository.findReview(filterData)
        return reviews
    }
}

export const findReviewAndUpdateUsecase = (reviewRepository : ReviewRepository , studentRepository : StudentRepository)=>{
    return async (studentId: string , reviewerId : string )=>{
        const studentData = await studentRepository.findStudentById(studentId)
        const week = studentData?.week as number
        
        const review = await reviewRepository.findReviewAndUpdate(studentId , week , reviewerId)
        return review
    }
}

export const findOneReviewUsecase = (reviewRepository : ReviewRepository ,studentRepository : StudentRepository) =>{
    return async (studentId : string  , week : undefined | number) =>{
        let weekNo 
        if (week) {
            weekNo = week
        }else{
            const studentData = await studentRepository.findStudentById(studentId)
            weekNo = studentData?.week as number

        }
       const review = await reviewRepository.findOneReview(studentId , weekNo)
       return review 
    }
}

export const UpdateMarkUsecase = (reviewRepository : ReviewRepository ,) =>{
    return async (id:string , week:number , data:updateValue  ) =>{
        const updateReviewData = await reviewRepository.findReviewAndUpdateMark(id , week , data )
        return updateReviewData
    }
}


export const findOneReviewDetailsUseCase = (reviewRepository : ReviewRepository ) =>{
    return async (reviewsId : string ) =>{
        const reviewDetails = await reviewRepository.findOneReviewId(reviewsId)
        return reviewDetails 
    }
}