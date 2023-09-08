import { ObjectId } from "mongoose"
import { Advisor, AdvisorId } from "../advisor/advisor"
import moment from "moment"
import { Student } from "../student/student"
import { Reviewer } from "../reviewer/reviewer"

export interface Review {
    _id : string
    student : ObjectId | Student
    week ?: number
    advisor ?: AdvisorId | Advisor | undefined
    reviewer ?: ObjectId | Reviewer | undefined
    date ?: Date
    mark ?: { code : number , theory : number}
    pendingTask ?: []
    status ?: string
    taskStatus ?: string 
    created_at:string

}

export const findReviewdata = ()=>{
    const eightDaysFromNow = moment().add(8, 'days').toDate();
}