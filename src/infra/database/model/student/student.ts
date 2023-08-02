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
    isBlocked : {type: Boolean } ,
    sex: { type: String, enum: ['male', 'female'] },
    domain : {type:String} , 
    fatherName: { type: String, },
    motherName: { type: String, },
    fatherNumber: { type: String,  },
    motherNumber: { type: String,  },
    guardianName: { type: String,  },
    guardianNumber: { type: String,  },
    isMailVarified: { type: Boolean, default: false },
   

    
},{
    timestamps : {createdAt:true}
});

export const studentModel : MongoDBStudent = mongoose.connection.model<Document<any,any,any>>('student' , studentSchema);
