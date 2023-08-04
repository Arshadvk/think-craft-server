import mongoose, { Document ,Model, Schema } from "mongoose";

export type MongoDBDomain = Model<Document<any , any , any>>

const domainSchema = new Schema({
    name :{type : String  , required : true } 
},{
    timestamps:{createdAt:true}
})

export const domainModel : MongoDBDomain = mongoose.connection.model < Document <any,any,any>>('domain' , domainSchema)