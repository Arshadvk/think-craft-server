import { ObjectId } from "mongoose"

export interface Slot{
    _id : string
    reviewer:ObjectId
    slotes:slotes[]
    created_at:string
    
}
export type slotes ={
    slot_time : string
    slot_date : string
    date : string
    isBooked?:boolean
}