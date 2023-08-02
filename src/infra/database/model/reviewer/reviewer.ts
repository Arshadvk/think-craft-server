import mongoose, { Document, Model, Schema } from "mongoose";

export type MongoDBReviewer = Model<Document<any, any, any>>;


const reviwerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String,  },
    password: { type: String,  },
    image: { type: String,  },
    age: { type: String, },
    dob: { type: Date },
    sex: { type: String, enum: ['male', 'female'] },
    isMailVarified: { type: Boolean, default: false },
    education:{type:String},
    company:{type:String},
    isBlocked : {type: Boolean } 
},{
    timestamps : {createdAt:true}
});

export const reviewerModel : MongoDBReviewer = mongoose.connection.model<Document<any,any,any>>('reviewer' , reviwerSchema);
