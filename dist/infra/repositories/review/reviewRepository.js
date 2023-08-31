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
Object.defineProperty(exports, "__esModule", { value: true });
const review_1 = require("../../database/model/review/review");
const ReviewRepositoryIMPL = (ReviewModel) => {
    const createNewReview = (studentId, review) => __awaiter(void 0, void 0, void 0, function* () {
        const isReviewExist = yield ReviewModel.findOne({ student: studentId });
        console.log(review);
        if (!isReviewExist) {
            const newReview = new ReviewModel({
                student: studentId,
                reviews: review
            });
            const createReview = yield newReview.save();
            return createReview;
        }
        isReviewExist.reviews.push(review);
        yield isReviewExist.save();
        return isReviewExist;
    });
    const findReview = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        const reviews = yield review_1.reviewModel.find(filterData).populate({
            path: 'student',
            populate: {
                path: 'domain'
            }
        }).populate('reviews.advisor').populate('student.domain');
        return reviews;
    });
    const findReviewAndUpdate = (studentId, week, reviewer) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield review_1.reviewModel.findOneAndUpdate({ student: studentId, 'reviews.week': week }, { $set: { 'reviews.$.reviewer': reviewer } } // Use the positional operator $ to update the specific element
        );
        return review;
    });
    const findOneReview = (studentId, week) => __awaiter(void 0, void 0, void 0, function* () {
        const reviews = yield review_1.reviewModel.findOne({ student: studentId, "reviews.week": week });
        return reviews;
    });
    return { createNewReview, findReview, findReviewAndUpdate, findOneReview };
};
exports.default = ReviewRepositoryIMPL;
