import { ObjectId } from "mongoose"

export interface Task{
    _id:string 
    domain : ObjectId
    tasks : tasks[]
    created_at:string
}
export type tasks ={
    week : Number
    personalDevelopmentWorkout : string[]
    technicalWorkouts : string[]
    miscellaneousWorkouts : string[]
}