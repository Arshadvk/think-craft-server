import { Schema } from "mongoose";



const reviewSchema = new  Schema({
    weekNo:{type : String , required : true },
    advisorId:{type:Schema.Types.ObjectId , ref : 'advisor'},
    studentId:{type: Schema.Types.ObjectId , ref : 'student'},
    reviewerId:{type: Schema.Types.ObjectId , ref : 'reviewer'},
    
})