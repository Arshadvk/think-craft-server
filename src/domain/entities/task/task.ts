import { ObjectId } from "mongoose"
import { Domain } from "../admin/domain"

export interface Task{
    _id:string 
    domain : ObjectId | Domain
    tasks : tasks[]
    created_at:string
}
export type tasks ={
    week : Number
    personalDevelopmentWorkout : string[]
    technicalWorkouts : string[]
    miscellaneousWorkouts : string[]
}