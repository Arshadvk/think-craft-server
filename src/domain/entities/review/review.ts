import { ObjectId } from "mongoose"
import { AdvisorId } from "../advisor/advisor"
import moment from "moment"

export interface Review {
    _id : string
    student : ObjectId
    reviews : reviews[]
    created_at:string

}

export type reviews ={
    week ?: number
    advisor ?: AdvisorId
    reviewer ?: ObjectId
    date ?: Date
    mark ?: { code : number , theory : number}
    pendingTask ?: []
    status ?: string

}

export const findReviewdata = ()=>{
    const eightDaysFromNow = moment().add(8, 'days').toDate();

}