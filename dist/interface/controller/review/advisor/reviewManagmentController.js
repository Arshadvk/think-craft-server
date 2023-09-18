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
exports.createReviewController = exports.updatedReviewController = void 0;
const review_1 = require("../../../../infra/database/model/review/review");
const advisor_1 = require("../../../../infra/database/model/advisor/advisor");
const student_1 = require("../../../../infra/database/model/student/student");
const reviewCreateUsecase_1 = require("../../../../app/usecase/review/reviewCreateUsecase");
const reviewUpdateUsecase_1 = require("../../../../app/usecase/review/reviewUpdateUsecase");
const advisorRepository_1 = __importDefault(require("../../../../infra/repositories/advisor/advisorRepository"));
const studentRepository_1 = __importDefault(require("../../../../infra/repositories/student/studentRepository"));
const reviewRepository_1 = __importDefault(require("../../../../infra/repositories/review/reviewRepository"));
const reviewRepository = (0, reviewRepository_1.default)(review_1.reviewModel);
const advisorRepository = (0, advisorRepository_1.default)(advisor_1.advisorModel);
const studentRepository = (0, studentRepository_1.default)(student_1.studentModel);
const updatedReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let data = {};
        let taskStatus = {};
        const value = req.body.value;
        const reviewId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
        const seminarVideo = value.seminar;
        const progressVideo = value.progress;
        const typing = value.typing;
        if (seminarVideo)
            taskStatus.seminar = seminarVideo;
        if (progressVideo)
            taskStatus.progress = progressVideo;
        if (typing)
            taskStatus.typing = typing;
        data.taskStatus = taskStatus;
        const updatedReview = yield (0, reviewUpdateUsecase_1.UpdateReviewUsecase)(reviewRepository)(reviewId, data);
        res.status(200).json(updatedReview);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.updatedReviewController = updatedReviewController;
const createReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = req.body.value;
        const week = value.week;
        const student = value.student;
        const status = value.status;
        const advisorId = req.user.advisor._id;
        let review = {};
        const taskStatus = {
            progress: 'Not added',
            seminar: 'Not added',
            typing: 'Not added'
        };
        const mark = {
            code: 0,
            theroy: 0
        };
        if (status === "next-week") {
            review.week = week + 1;
        }
        else {
            review.week = week;
            review.advisor = advisorId;
        }
        review.student = student;
        review.mark = mark;
        review.taskStatus = taskStatus;
        const newReview = yield (0, reviewCreateUsecase_1.createReviewUsecase)(reviewRepository, advisorRepository, studentRepository)(student, review);
        res.status(200).json(newReview);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.createReviewController = createReviewController;
