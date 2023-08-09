import mongoose, { Document, Model, Schema } from "mongoose";

export type MongoDBTask = Model<Document<any,any,any>>

const taskSchema = new Schema({
    weekNo:{type :Number },
    domain:{ type: Schema.Types.ObjectId, ref: 'domain' },
    personalDevelopmentWorkout:{type:Array},
    technicalWorkouts:{type:Array},
    miscellaneousWorkouts:{type:Array}

},{
    timestamps : {createdAt:true}
})

export const taskModel : MongoDBTask = mongoose.connection.model<Document<any,any,any>>('task',taskSchema);