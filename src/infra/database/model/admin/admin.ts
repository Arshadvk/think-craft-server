import mongoose, { Document, Model, Schema } from "mongoose";

export type MongoDbAdmin = Model<Document<any,any,any>>

const adminSchema = new Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    number:{type:String}
})

export const adminModel : MongoDbAdmin = mongoose.connection.model<Document<any,any,any>>("admin" , adminSchema)