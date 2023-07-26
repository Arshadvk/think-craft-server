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
    sex: { type: String, enum: ['male', 'female'] },
    isMailVarified: { type: Boolean, default: false },
    education:{type:String},
},{
    timestamps : {createdAt:true}
});

export const advisorModel : MongoDBAdvisor = mongoose.connection.model<Document<any,any,any>>('advisor' , advisorSchema);
