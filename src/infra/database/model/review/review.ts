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
    },
    reviewer: {
        type: Schema.Types.ObjectId, ref: 'reviewer'
    },
    advisor: {
        type: Schema.Types.ObjectId, ref: "advisor"
    },
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
        },
    },
    pendingTask: {
        type: Array
    },
    status: {
        type: String,
        default: "not-scheduled"
    },
    taskStatus: {
        type: String
    }
}, {
    timestamps: { createdAt: true }
})

export const reviewModel: MongoDBReview = mongoose.connection.model<Document<any, any, any> & Review>('review', reviewSchema)
