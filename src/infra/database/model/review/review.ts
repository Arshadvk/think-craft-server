import mongoose, { Document, Model, Schema } from "mongoose";
import { Review } from "../../../../domain/entities/review/review";
import moment from "moment";

export type MongoDBReview = Model<Document<any, any, any> & Review>;

const reviewSchema = new Schema<Review>({
    student: { type: Schema.Types.ObjectId, ref: "student" },
    date: {
        type: String,
        default: moment().add(8, 'days').toDate()
    },
    week: {
        type: Number,
        default: 0, // Default value for 'week' field
    },
    reviewer: {
        type: Schema.Types.ObjectId, ref: 'reviewer'
    },
    advisor: {
        type: Schema.Types.ObjectId, ref: "advisor"
    },
    time: String,
    day: String,
    mark: {
        type: {
            code: {
                type: Number,
                default: 0,
            },
            theory: {
                type: Number,
                default: 0,
            },
            weekStatus : {
                type : String ,
                default : '______'
            }
        },
    },
    pendingTask: {
        type: Array,
        default: [] 
    },
    status: {
        type: String,
        default: "not-scheduled"
    },
    uploadTask: {
        type: {
            personalDevelopmentWorkout: {
                type: String
            }, 
            technicalWorkouts: {
                type: String
            },
            miscellaneousWorkouts: {
                type: String
            },
        },
    },
    taskStatus: {
        type : {
            seminar: {
                type: String,
                default: 'Not added' 
            },
            progress: {
                type: String,
                default: 'Not added' 
            },
            typing: {
                type: String,
                default: 'Not added' 
            }
        },
    },
}, {
    timestamps: { createdAt: true }
});

export const reviewModel: MongoDBReview = mongoose.connection.model<Document<any, any, any> & Review>('review', reviewSchema);
