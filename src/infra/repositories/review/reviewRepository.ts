import mongoose, { ObjectId } from "mongoose"
import { Review, reviews } from "../../../domain/entities/review/review"
import { MongoDBReview, reviewModel } from "../../database/model/review/review"

export type filterReview = {
    date?: Date,
    student?: ObjectId | undefined
    reviewer?: string | undefined
    advisor?: string | undefined
    type?: string | undefined
}
export type mark = {
    code: number;
    theory: number
}
export type updateValue = {
    mark?: mark
    pendingTask?: []
    weekStatus?: string
}
export type ReviewRepository = {
    createNewReview: (studentId: string, review: reviews) => Promise<Review>
    findReview: (filterReview: filterReview) => Promise<Review | null>
    findReviewAndUpdate: (studentId: string, week: number, reviewer: string) => Promise<Review | null>
    findOneReview: (studentId: string, week: number) => Promise<Review | null>
    findReviewAndUpdateMark: (id: string, week: number, data: updateValue) => Promise<Review | null>
    findOneReviewId : (reviewsId : string) => Promise <Review | null>
}

const ReviewRepositoryIMPL = (ReviewModel: MongoDBReview): ReviewRepository => {

    const createNewReview = async (studentId: string, review: reviews): Promise<Review> => {
        const isReviewExist = await ReviewModel.findOne({ student: studentId })
        console.log(review);

        if (!isReviewExist) {
            const newReview = new ReviewModel({
                student: studentId,
                reviews: review,

            })

            const createReview: Review = await newReview.save()
            return createReview
        }

        isReviewExist.reviews.push(review)
        await isReviewExist.save()
        return isReviewExist
    }
  
    const findReview = async (filterData: filterReview): Promise<Review | null> => {


        console.log('hell', filterData);

        if (filterData.advisor && !filterData.student) {
            if (filterData.type) {
                console.log("type");

                const reviews: any | null = await reviewModel.find({ "reviews.advisor": filterData.advisor, 'reviews.status': 'not-scheduled' }).populate({
                    path: 'student',
                    populate: {
                        path: 'domain'
                    }
                }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer')
                return reviews

            } else {
                console.log("typeeee");

                const rev: any | null = await reviewModel.find({ "reviews.advisor": filterData.advisor }).populate({
                    path: 'student',
                    populate: {
                        path: 'domain'
                    }
                }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer')

                const reviews: any | null = await reviewModel.aggregate([{
                    $unwind: '$reviews',
                }, {
                    $match: {
                        'reviews.advisor': new mongoose.Types.ObjectId(filterData.advisor)
                    }
                }, {
                    $lookup: {
                        from: "students", // Assuming your student collection is named "students"
                        localField: "student",
                        foreignField: "_id",
                        as: "student",
                    },
                },
                {
                    $lookup: {
                        from: "reviewers", // Assuming your reviewer collection is named "reviewers"
                        localField: "reviews.advisor",
                        foreignField: "_id",
                        as: "reviews.advisor",
                    },
                },
                {
                    $lookup: {
                        from: "reviewers", // Assuming your reviewer collection is named "reviewers"
                        localField: "reviews.reviewer",
                        foreignField: "_id",
                        as: "reviews.reviewer",
                    },
                }, {
                    $unwind: "$student", // Unwind the student array
                },

                ])
                return reviews
            }
        }
        if (filterData.reviewer && !filterData.student) {
            const reviews: any | null = await reviewModel.find({ "reviews.reviewer": filterData.reviewer }).populate({
                path: 'student',
                populate: {
                    path: 'domain'
                }
            }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer')



            const rev: any | null = await reviewModel.aggregate([{
                $unwind: '$reviews',
            },
            {
                $match: {
                    'reviews.reviewer': new mongoose.Types.ObjectId(filterData.reviewer)
                }
            }, {
                $lookup: {
                    from: "students", // Assuming your student collection is named "students"
                    localField: "student",
                    foreignField: "_id",
                    as: "student",
                },
            },
            {
                $lookup: {
                    from: "reviewers", // Assuming your reviewer collection is named "reviewers"
                    localField: "reviews.advisor",
                    foreignField: "_id",
                    as: "reviews.advisor",
                },
            },
            {
                $lookup: {
                    from: "reviewers", // Assuming your reviewer collection is named "reviewers"
                    localField: "reviews.reviewer",
                    foreignField: "_id",
                    as: "reviews.reviewer",
                },
            }, {
                $unwind: "$student", // Unwind the student array
            },

            ])
            console.log(rev, '==========')

            return rev
        }
        else {
            console.log("hello");

            const reviews: any | null = await reviewModel.find(filterData).populate({
                path: 'student',
                populate: {
                    path: 'domain'
                }
            }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer')

            return reviews
        }

    }

    const findReviewAndUpdate = async (studentId: string, week: number, reviewer: string): Promise<Review | null> => {
        const review: Review | null = await reviewModel.findOneAndUpdate(
            { student: studentId, 'reviews.week': week },
            { $set: { 'reviews.$.reviewer': reviewer, 'reviews.$.status': "scheduled" } }
        );
        return review;
    };

    const findReviewAndUpdateMark = async (id: string, week: number, data: updateValue): Promise<Review | null> => {
        if (data.mark) {
            const updatedReview: Review | null = await reviewModel.findOneAndUpdate({ student: id, 'reviews.week': week },
                { $set: { "reviews.$.mark": data.mark, 'reviews.$.status': 'conducted', 'reviews.$.taskStatus': data.weekStatus } },
                { new: true })
            return updatedReview
        } else {
            const updatedReview: Review | null = await reviewModel.findOneAndUpdate({ student: id, 'reviews.week': week },
                { $set: { "reviews.$.pendingTask": data.pendingTask } },
                { new: true })
            return updatedReview
        }
    }
    const findOneReview = async (studentId: string, week: number): Promise<Review | null> => {
        const reviews: Review | null = await reviewModel
            .findOne({ student: studentId, "reviews.week": week })
            .populate({
                path: 'student',
                populate: {
                    path: 'domain'
                }
            }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer')
        return reviews
    }

    const findOneReviewId =async (reviewId:string ) : Promise <Review | null > => {
       console.log(reviewId);
       
        const reviews : any | null = await reviewModel.find({'reviews._id' : reviewId
             },{'reviews$' : 1}).populate('reviews.advisor').populate('reviews.reviewer')
             console.log(reviews);
             
        return reviews
        
    }

    return { createNewReview, findReview, findReviewAndUpdate, findOneReview, findReviewAndUpdateMark , findOneReviewId}
}


export default ReviewRepositoryIMPL