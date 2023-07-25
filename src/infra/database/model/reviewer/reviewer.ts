import mongoose, { Document, Model, Schema } from "mongoose";

export type MongoDBReviewer = Model<Document<any, any, any>>;


const reviwerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    age: { type: String, required: true },
    dob: { type: Date },
    sex: { type: String, enum: ['male', 'female'] },
    isMailVarified: { type: Boolean, default: false },
    education:{type:String},
    company:{type:String} 
},{
    timestamps : {createdAt:true}
});

export const reviewerModel : MongoDBReviewer = mongoose.connection.model<Document<any,any,any>>('reviewer' , reviwerSchema);
