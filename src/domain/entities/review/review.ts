import moment from "moment"
import { ObjectId } from "mongoose"
import { Student } from "../student/student"
import { Advisor } from "../advisor/advisor"
import { Reviewer } from "../reviewer/reviewer"
import { taskStatus } from "../../../infra/repositories/review/reviewRepository"
import { mark } from "../../../interface/controller/review/reviewMangmentController"

export interface Review {
    _id?: string
    student?: ObjectId | Student
    week?: number
    advisor?: ObjectId | Advisor | undefined
    reviewer?: ObjectId | Reviewer | undefined
    date?: Date
    day ?: string 
    time ?: string
    mark?: mark
    pendingTask?: []
    status?: string
    taskStatus?: taskStatus
    created_at?: string
    uploadTask?: uploadTask


}


export type uploadTask = {
    personalDevelopmentWorkout: string
    technicalWorkouts: string
    miscellaneousWorkouts: string
}


export const findReviewdata = () => {
    const eightDaysFromNow = moment().add(8, 'days').toDate();
}