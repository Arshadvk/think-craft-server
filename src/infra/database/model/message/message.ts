import mongoose, { Document, Model, Schema } from "mongoose";

export type MongoDBMessage = Model<Document<any , any , any>>
const messageSchema = new Schema({
    sender : {type : mongoose.Schema.Types.ObjectId , ref : 'student'} , 
    content : {type : String , trim : true },
    chat : {type : mongoose.Schema.Types.ObjectId , ref : "student"}
},{
    timestamps:{createdAt:true}
})

export const messageModel : MongoDBMessage = mongoose.connection.model <Document<any , any , any>>('message' , messageSchema)