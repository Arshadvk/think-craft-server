import mongoose, { Document, Model, Schema } from "mongoose";

export type MongoDBAdvisor = Model<Document<any, any, any>>;


const advisorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String,  },
    password: { type: String,  },
    image: { type: String },
    age: { type: String, },
    dob: { type: Date },
    qualification:{ type: String,  },
    gender: { type: String, enum: ['male', 'female'] },
    isProfileVarified: { type: Boolean, default: false },
    isBlocked : {type: Boolean , default:false } ,
},{
    timestamps : {createdAt:true}
});

export const advisorModel : MongoDBAdvisor = mongoose.connection.model<Document<any,any,any>>('advisor' , advisorSchema);
