import mongoose, { Document, Model, Schema } from "mongoose";
import { UploadTask } from "../../../../domain/entities/upload_task/uploadTask";


export type MongoDBUploadTask = Model<Document<any, any, any>&UploadTask>

const uploadTaskSchema = new Schema<UploadTask>({
    student: { type: Schema.Types.ObjectId, ref: "student" },
    uploads: {
        type:
            [{
                week: {
                    type: Number
                },
                personalDevelopmentWorkout: {
                    type: Array
                }, technicalWorkouts: {
                    type: Array
                }, miscellaneousWorkouts: {
                    type: Array
                },
            }],
    },
},{
    timestamps :{createdAt:true}
})

export const uploadTaskModel : MongoDBUploadTask = mongoose.connection.model<Document <any , any , any >&UploadTask>('uploadTask' ,uploadTaskSchema)