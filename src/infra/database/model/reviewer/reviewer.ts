import mongoose, { Document, Model, Schema } from "mongoose";

export type MongoDBReviewer = Model<Document<any, any, any>>;


const reviwerSchema = new Schema({
    name: { type: String, required: true },
    address: {type:String} , 
    email: { type: String, required: true },
    number: { type: String,  },
    password: { type: String,  },
    image: { type: String,  },
    age: { type: String, },
    dob: { type: Date },
    domain:[{type: Schema.Types.ObjectId, ref: 'domain'}],
    gender: { type: String, enum: ['male', 'female'] },
    isProfileVerified: { type: Boolean, default: false },
    qualification:{type:String},
    company:{type:String},
    isBlocked : {type: Boolean , default:false }  
},{
    timestamps : {createdAt:true}
});

export const reviewerModel : MongoDBReviewer = mongoose.connection.model<Document<any,any,any>>('reviewer' , reviwerSchema);
