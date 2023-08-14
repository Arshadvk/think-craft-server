import { ObjectId } from "mongoose"

export interface Review {
    _id : string
    student : ObjectId
    reviews : reviews[]
    created_at:string

}

export type reviews ={
    week : number
    advisor : ObjectId
    reviewer : ObjectId
    mark : { code : number , theory : number}
    pendingTask : []
    status : string

}