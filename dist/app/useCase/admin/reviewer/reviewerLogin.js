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
exports.loginReviewer = void 0;
const reviewer_1 = require("../../../../domain/entities/reviewer/reviewer");
const error_1 = require("../../../../utils/error");
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
