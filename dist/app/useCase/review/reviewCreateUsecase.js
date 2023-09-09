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
exports.weekBackUsecase = exports.getRandomAdvisor = exports.createReviewUsecase = void 0;
const createReviewUsecase = (reviewRepository, advisorRepository, studentRepository) => {
    return (studentId, review) => __awaiter(void 0, void 0, void 0, function* () {
        const advisors = yield advisorRepository.findAvilableAdvisor();
        const selectedAdvisor = (0, exports.getRandomAdvisor)(advisors);
        if (!selectedAdvisor) {
            throw new Error('No available advisors');
        }
        review.advisor = selectedAdvisor;
        const taskStatus = {
            progress: 'Not added',
            seminar: 'Not added',
            typing: 'Not added'
        };
        const mark = {
            code: 0,
            theroy: 0
        };
        console.log(studentId);
        review.student = studentId;
        review.mark = mark;
        review.taskStatus = taskStatus;
        console.log(review);
        const newReview = yield reviewRepository.createNewReview(review);
        const weekUpdatedStudent = yield studentRepository.updateStudentWeek(studentId, review.week);
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
const weekBackUsecase = (reviewRepository) => {
    return (review) => __awaiter(void 0, void 0, void 0, function* () {
        const newReview = yield reviewRepository.createNewReview(review);
        return newReview;
    });
};
exports.weekBackUsecase = weekBackUsecase;
