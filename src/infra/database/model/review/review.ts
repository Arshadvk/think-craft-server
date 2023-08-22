import mongoose, { Document, Model, Schema } from "mongoose";
import { Review } from "../../../../domain/entities/review/review";

export type MongoDBReview = Model<Document<any , any, any >&Review>;

const reviewSchema = new  Schema<Review>({
    student :{type : Schema.Types.ObjectId , ref :"student"},
    reviews : {
        type:[{
            date :{
                type : String ,
            },
            week :{
                type : Number ,
            },
            reviewer:{
                type : Schema.Types.ObjectId , ref : 'reviewer'
            },
            advisor :{
                type : Schema.Types.ObjectId , ref:"advisor"
            },
            
        }]
    }
},{
    timestamps:{createdAt:true}
})

export const reviewModel : MongoDBReview =  mongoose.connection.model<Document<any , any , any >&Review>('review' , reviewSchema)
