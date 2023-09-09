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
exports.getReviewListByWeekUseCase = exports.getReviewListUseCase = exports.getReviewByIdUsecase = void 0;
const getReviewByIdUsecase = (reviewRepository) => {
    return (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield reviewRepository.findOneReviewByid(reviewId);
        return review;
    });
};
exports.getReviewByIdUsecase = getReviewByIdUsecase;
const getReviewListUseCase = (reviewRepository) => {
    return (filterReview) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield reviewRepository.findReview(filterReview);
        return review;
    });
};
exports.getReviewListUseCase = getReviewListUseCase;
const getReviewListByWeekUseCase = (reviewRepository, studentRepository) => {
    return (studentId) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield studentRepository.findStudentById(studentId);
        const filterReview = {
            student: studentId,
            week: student.week
        };
        const review = yield reviewRepository.findReview(filterReview);
        if (review) {
            return review[(review === null || review === void 0 ? void 0 : review.length) - 1];
        }
        return review;
    });
};
exports.getReviewListByWeekUseCase = getReviewListByWeekUseCase;
