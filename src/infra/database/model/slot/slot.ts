import mongoose, { Document, Model, Schema } from "mongoose";
import { Slot } from "../../../../domain/entities/slot/slot";

export type MongoDBSlot = Model<Document<any, any , any>&Slot>;

const slotSchema = new Schema<Slot>({
    reviewer:{type: Schema.Types.ObjectId, ref: 'reviewer'},
    slotes :{
        type:[{
            slot_time : {
                type :String , 
                required : true
            },
            date:{
                type:Date
            },slot_date :{
                type : String , 
                required : true 
            },isBooked:{
                type : Boolean ,
                required : true ,
                default : false
            },
        }],
    },
    
},{
    timestamps:{createdAt:true}
})

export const slotModel : MongoDBSlot = mongoose.connection.model<Document<any,any,any >& Slot>("slot",slotSchema)