import { Document, Model, Schema } from "mongoose";


export type MongoDBUplploadTask = Model<Document <any ,any ,any >>

const uploadTaskSchema = new Schema({
    student:{type :Schema.Types.ObjectId ,ref:"student"} ,
    tasks:[{
        week:{
            type : Number
        },
        personalDevelopmentWorkout :{
            type : Array
        },technicalWorkouts : {
            type : Array
        },miscellaneousWorkouts :{
            type : Array
        }
    }]

})