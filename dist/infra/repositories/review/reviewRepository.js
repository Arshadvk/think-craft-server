"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const review_1 = require("../../database/model/review/review");
const ReviewRepositoryIMPL = (ReviewModel) => {
    const createNewReview = (studentId, review) => __awaiter(void 0, void 0, void 0, function* () {
        const isReviewExist = yield ReviewModel.findOne({ student: studentId });
        console.log(review);
        if (!isReviewExist) {
            const newReview = new ReviewModel({
                student: studentId,
                reviews: review,
            });
            const createReview = yield newReview.save();
            return createReview;
        }
        isReviewExist.reviews.push(review);
        yield isReviewExist.save();
        return isReviewExist;
    });
    const findReview = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('hell', filterData);
        if (filterData.advisor && !filterData.student) {
            if (filterData.type) {
                console.log("type");
                const reviews = yield review_1.reviewModel.find({ "reviews.advisor": filterData.advisor, 'reviews.status': 'not-scheduled' }).populate({
                    path: 'student',
                    populate: {
                        path: 'domain'
                    }
                }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer');
                return reviews;
            }
            else {
                console.log("typeeee");
                const rev = yield review_1.reviewModel.find({ "reviews.advisor": filterData.advisor }).populate({
                    path: 'student',
                    populate: {
                        path: 'domain'
                    }
                }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer');
                const reviews = yield review_1.reviewModel.aggregate([{
                        $unwind: '$reviews',
                    }, {
                        $match: {
                            'reviews.advisor': new mongoose_1.default.Types.ObjectId(filterData.advisor)
                        }
                    }, {
                        $lookup: {
                            from: "students",
                            localField: "student",
                            foreignField: "_id",
                            as: "student",
                        },
                    },
                    {
                        $lookup: {
                            from: "reviewers",
                            localField: "reviews.advisor",
                            foreignField: "_id",
                            as: "reviews.advisor",
                        },
                    },
                    {
                        $lookup: {
                            from: "reviewers",
                            localField: "reviews.reviewer",
                            foreignField: "_id",
                            as: "reviews.reviewer",
                        },
                    }, {
                        $unwind: "$student", // Unwind the student array
                    },
                ]);
                return reviews;
            }
        }
        if (filterData.reviewer && !filterData.student) {
            const reviews = yield review_1.reviewModel.find({ "reviews.reviewer": filterData.reviewer }).populate({
                path: 'student',
                populate: {
                    path: 'domain'
                }
            }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer');
            const rev = yield review_1.reviewModel.aggregate([{
                    $unwind: '$reviews',
                },
                {
                    $match: {
                        'reviews.reviewer': new mongoose_1.default.Types.ObjectId(filterData.reviewer)
                    }
                }, {
                    $lookup: {
                        from: "students",
                        localField: "student",
                        foreignField: "_id",
                        as: "student",
                    },
                },
                {
                    $lookup: {
                        from: "reviewers",
                        localField: "reviews.advisor",
                        foreignField: "_id",
                        as: "reviews.advisor",
                    },
                },
                {
                    $lookup: {
                        from: "reviewers",
                        localField: "reviews.reviewer",
                        foreignField: "_id",
                        as: "reviews.reviewer",
                    },
                }, {
                    $unwind: "$student", // Unwind the student array
                },
            ]);
            console.log(rev, '==========');
            return rev;
        }
        else {
            console.log("hello");
            const reviews = yield review_1.reviewModel.find(filterData).populate({
                path: 'student',
                populate: {
                    path: 'domain'
                }
            }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer');
            return reviews;
        }
    });
    const findReviewAndUpdate = (studentId, week, reviewer) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield review_1.reviewModel.findOneAndUpdate({ student: studentId, 'reviews.week': week }, { $set: { 'reviews.$.reviewer': reviewer, 'reviews.$.status': "scheduled" } });
        return review;
    });
    const findReviewAndUpdateMark = (id, week, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.mark) {
            const updatedReview = yield review_1.reviewModel.findOneAndUpdate({ student: id, 'reviews.week': week }, { $set: { "reviews.$.mark": data.mark, 'reviews.$.status': 'conducted', 'reviews.$.taskStatus': data.weekStatus } }, { new: true });
            return updatedReview;
        }
        else {
            const updatedReview = yield review_1.reviewModel.findOneAndUpdate({ student: id, 'reviews.week': week }, { $set: { "reviews.$.pendingTask": data.pendingTask } }, { new: true });
            return updatedReview;
        }
    });
    const findOneReview = (studentId, week) => __awaiter(void 0, void 0, void 0, function* () {
        const reviews = yield review_1.reviewModel
            .findOne({ student: studentId, "reviews.week": week })
            .populate({
            path: 'student',
            populate: {
                path: 'domain'
            }
        }).populate('reviews.advisor').populate('student.domain').populate('reviews.reviewer');
        return reviews;
    });
    const findOneReviewId = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(reviewId);
        const reviews = yield review_1.reviewModel.find({ 'reviews._id': reviewId
        }, { 'reviews$': 1 }).populate('reviews.advisor').populate('reviews.reviewer');
        console.log(reviews);
        return reviews;
    });
    return { createNewReview, findReview, findReviewAndUpdate, findOneReview, findReviewAndUpdateMark, findOneReviewId };
};
exports.default = ReviewRepositoryIMPL;
