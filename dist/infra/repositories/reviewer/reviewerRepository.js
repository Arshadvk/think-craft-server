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
const error_1 = require("../../../utils/error");
const reviewer_1 = require("../../database/model/reviewer/reviewer");
const reviewerRepositoryImpl = (ReviewerModel) => {
    const createReviewer = (reviewerData) => __awaiter(void 0, void 0, void 0, function* () {
        const newReviewer = yield reviewer_1.reviewerModel.create(reviewerData);
        return newReviewer;
    });
    const findReviewerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const reviewer = yield reviewer_1.reviewerModel.findOne({ email });
        return reviewer;
    });
    const setReviewerPassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
        const reviewer = yield reviewer_1.reviewerModel.findByIdAndUpdate({ _id: id }, { $set: { password: password } });
        return reviewer;
    });
    const getAllReviewer = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        if (filterData.search) {
            const allReviewer = reviewer_1.reviewerModel.find(filterData.search).populate('domain');
            return allReviewer;
        }
        else {
            const allReviewer = reviewer_1.reviewerModel.find(filterData).populate('domain');
            return allReviewer;
        }
    });
    const updateIsBlock = (userId, action) => __awaiter(void 0, void 0, void 0, function* () {
        let isBlocked;
        if (action === "block")
            isBlocked = true;
        if (action === "unblock")
            isBlocked = false;
        const reviewer = yield reviewer_1.reviewerModel.findByIdAndUpdate(userId, { isBlocked }, { new: true });
        if (!reviewer)
            throw new error_1.AppError("somthing went worng when block the reviwer", 500);
        return isBlocked;
    });
    const updateReviewerProfile = (userId, reviewerData) => __awaiter(void 0, void 0, void 0, function* () {
        const reviewer = yield reviewer_1.reviewerModel.findByIdAndUpdate(userId, reviewerData, { new: true });
        if (!reviewer)
            throw new error_1.AppError('somthing went wrong when block the user ', 500);
        return reviewer;
    });
    const findReviewerById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const reviewer = yield reviewer_1.reviewerModel.findById(userId).populate('domain');
        console.log(reviewer);
        return reviewer;
    });
    return {
        createReviewer,
        findReviewerByEmail,
        setReviewerPassword,
        getAllReviewer,
        updateIsBlock,
        updateReviewerProfile,
        findReviewerById
    };
};
exports.default = reviewerRepositoryImpl;
