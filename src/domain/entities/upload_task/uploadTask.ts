import { ObjectId } from "mongoose"

export interface UploadTask {
    _id : string 
    student : ObjectId 
    uploads: uploads[]
    create_at : string
}

export type uploads = {
    week ?: number 
    personalDevelopmentWorkout ?: string[] | null
    technicalWorkouts ?: string[] | null 
    miscellaneousWorkouts ?: string[] | null
}