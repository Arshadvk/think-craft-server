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
exports.findOneReviewUsecase = exports.findReviewAndUpdateUsecase = exports.getReviewListUseCase = exports.getRandomAdvisor = exports.createReviewUsecase = void 0;
const createReviewUsecase = (reviewRepository, advisorRepository) => {
    return (studentId, review) => __awaiter(void 0, void 0, void 0, function* () {
        const advisors = yield advisorRepository.findAvilableAdvisor();
        const selectedAdvisor = (0, exports.getRandomAdvisor)(advisors);
        if (!selectedAdvisor) {
            throw new Error('No available advisors');
        }
        review.advisor = selectedAdvisor;
        const newReview = yield reviewRepository.createNewReview(studentId, review);
        return newReview;
    });
};
exports.createReviewUsecase = createReviewUsecase;
const getRandomAdvisor = (advisors) => {
    if (advisors.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * advisors.length);
    return advisors[randomIndex];
};
exports.getRandomAdvisor = getRandomAdvisor;
const getReviewListUseCase = (reviewRepository) => {
    return (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        const reviews = yield reviewRepository.findReview(filterData);
        return reviews;
    });
};
exports.getReviewListUseCase = getReviewListUseCase;
const findReviewAndUpdateUsecase = (reviewRepository, studentRepository) => {
    return (studentId, reviewerId) => __awaiter(void 0, void 0, void 0, function* () {
        const studentData = yield studentRepository.findStudentById(studentId);
        const week = studentData === null || studentData === void 0 ? void 0 : studentData.week;
        const review = yield reviewRepository.findReviewAndUpdate(studentId, week, reviewerId);
        return review;
    });
};
exports.findReviewAndUpdateUsecase = findReviewAndUpdateUsecase;
const findOneReviewUsecase = (reviewRepository, studentRepository) => {
    return (studentId) => __awaiter(void 0, void 0, void 0, function* () {
        const studentData = yield studentRepository.findStudentById(studentId);
        const week = studentData === null || studentData === void 0 ? void 0 : studentData.week;
        const review = yield reviewRepository.findOneReview(studentId, week);
        return review;
    });
};
exports.findOneReviewUsecase = findOneReviewUsecase;
