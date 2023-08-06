import mongoose, { Document, Model, Schema } from "mongoose";

export type MongoDBSlot = Model<Document<any, any , any>>;

const slotSchema = new Schema({
    timeForPerReview:{type:String , required:true},
    reviewer:{type: Schema.Types.ObjectId, ref: 'reviewer'},
    timeStart:{type:String},
    timeEnd:{type:String},
    date:{type:Date}
    
},{
    timestamps:{createdAt:true}
})

export const slotModel : MongoDBSlot = mongoose.connection.model<Document<any,any,any>>("slot",slotSchema)