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
exports.changeReviewerPassword = exports.loginReviewer = void 0;
const error_1 = require("../../../utils/error");
const hashing_1 = require("../../../domain/service/hashing");
const reviewer_1 = require("../../../domain/entities/reviewer/reviewer");
const loginReviewer = (reviewerRepository) => {
    return (reviewer) => __awaiter(void 0, void 0, void 0, function* () {
        const isReviewerExist = yield reviewerRepository.findReviewerByEmail(reviewer.email);
        if (!isReviewerExist)
            throw new error_1.AppError("user is not exist", 404);
        const ReviewerToken = yield (0, reviewer_1.reviewerLoginValidate)(reviewer, isReviewerExist);
        const verifiedReviewer = {
            token: ReviewerToken,
            status: "Login success"
        };
        return verifiedReviewer;
    });
};
exports.loginReviewer = loginReviewer;
const changeReviewerPassword = (reviewerRepository) => {
    return (reviewerId, value) => __awaiter(void 0, void 0, void 0, function* () {
        const isReviewerExist = yield reviewerRepository.findReviewerById(reviewerId);
        if (!isReviewerExist)
            throw new error_1.AppError("user is not exist", 404);
        const IsPasswordCorrect = yield (0, hashing_1.isPasswordCorrect)(value.oldpass, isReviewerExist.password);
        if (!IsPasswordCorrect)
            throw new error_1.AppError("Old password is not same", 404);
        const hashedPassword = yield (0, hashing_1.passwordHashing)(value.newpass);
        const updateReviewer = yield reviewerRepository.updateReviewerProfile(reviewerId, { password: hashedPassword });
        return updateReviewer;
    });
};
exports.changeReviewerPassword = changeReviewerPassword;
