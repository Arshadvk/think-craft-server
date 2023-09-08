import mongoose, { Document, Model, Schema } from "mongoose";

export type MongoDBStudent = Model<Document<any, any, any>>;


const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, },
    password: { type: String,},
    image: { type: String,  },
    address: { type: String,  },
    dob: { type: Date },
    isBlocked : {type: Boolean , default:false } ,
    qualification:{ type: String,  },
    domain:{type: Schema.Types.ObjectId, ref: 'domain'},
    gender: { type: String, enum: ['male', 'female'] }, 
    isProfileVerified: { type: Boolean, default: false },
    week: {type:Number  , default:0} 
   

    
},{
    timestamps : {createdAt:true}
});

export const studentModel : MongoDBStudent = mongoose.connection.model<Document<any,any,any>>('student' , studentSchema);
