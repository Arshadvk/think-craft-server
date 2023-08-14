import mongoose, { Document, Model, Schema } from "mongoose";
import { Task } from "../../../../domain/entities/task/task";

export type MongoDBTask = Model<Document<any,any,any>&Task>

const taskSchema = new Schema<Task>({
    domain:{ type: Schema.Types.ObjectId, ref: 'domain' },
    tasks : {
        type: [{
            week:{
                type :Number 
            },
            personalDevelopmentWorkout:{
                type:Array
            },
            technicalWorkouts:{
                type:Array
            },
            miscellaneousWorkouts:{
                type:Array
            },
        }],
    },

},{
    timestamps : {createdAt:true}
})

export const taskModel : MongoDBTask = mongoose.connection.model<Document<any,any,any>&Task>('task',taskSchema);