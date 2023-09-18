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
const ReviewRepositoryIMPL = (ReviewModel) => {
    const createNewReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
        const newReview = new ReviewModel(reviewData);
        const createReview = yield newReview.save();
        return createReview;
    });
    const findOneReviewByid = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield ReviewModel.findById(id).populate({
            path: 'student',
            populate: {
                path: 'domain'
            }
        }).populate('advisor').populate('student.domain').populate('reviewer');
        return review;
    });
    const findReview = (filterReview) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield ReviewModel.find(filterReview).populate({
            path: 'student',
            populate: {
                path: 'domain'
            }
        }).populate('advisor').populate('student.domain').populate('reviewer');
        return review;
    });
    const findReviewAndUpdate = (reviewId, reviewUpdatedData) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield ReviewModel.findByIdAndUpdate(reviewId, { $set: reviewUpdatedData });
        return review;
    });
    return { createNewReview, findOneReviewByid, findReview, findReviewAndUpdate };
};
exports.default = ReviewRepositoryIMPL;
