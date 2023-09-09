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
exports.updatedReviewController = void 0;
const reviewRepository_1 = __importDefault(require("../../../../infra/repositories/review/reviewRepository"));
const review_1 = require("../../../../infra/database/model/review/review");
const reviewUpdateUsecase_1 = require("../../../../app/usecase/review/reviewUpdateUsecase");
const advisorRepository_1 = __importDefault(require("../../../../infra/repositories/advisor/advisorRepository"));
const studentRepository_1 = __importDefault(require("../../../../infra/repositories/student/studentRepository"));
const advisor_1 = require("../../../../infra/database/model/advisor/advisor");
const student_1 = require("../../../../infra/database/model/student/student");
const reviewCreateUsecase_1 = require("../../../../app/usecase/review/reviewCreateUsecase");
const reviewRepository = (0, reviewRepository_1.default)(review_1.reviewModel);
const advisorRepository = (0, advisorRepository_1.default)(advisor_1.advisorModel);
const studentRepository = (0, studentRepository_1.default)(student_1.studentModel);
const updatedReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let data = {};
        let taskStatus = {};
        const value = req.body.value;
        console.log(req.body);
        const advisor = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.advisor) === null || _b === void 0 ? void 0 : _b._id;
        const reviewId = (_c = req.body) === null || _c === void 0 ? void 0 : _c.id;
        const seminarVideo = value.seminar;
        const progressVideo = value.progress;
        const week = value.week;
        const typing = value.typing;
        const weekStatus = value.weekStatus;
        const student = value.student;
        if (seminarVideo)
            taskStatus.seminar = seminarVideo;
        if (progressVideo)
            taskStatus.progress = progressVideo;
        if (typing)
            taskStatus.typing = typing;
        data.taskStatus = taskStatus;
        const updatedReview = yield (0, reviewUpdateUsecase_1.UpdateReviewUsecase)(reviewRepository)(reviewId, data);
        console.log(updatedReview + "mjsdnfj");
        if (weekStatus == 'pass') {
            console.log(weekStatus);
            const review = {
                week: week + 1
            };
            const newReview = yield (0, reviewCreateUsecase_1.createReviewUsecase)(reviewRepository, advisorRepository, studentRepository)(student, review);
            res.status(200).json(newReview);
        }
        else {
            console.log("gff");
            const review = {
                week: week,
                advisor: advisor
            };
            const newReview = yield (0, reviewCreateUsecase_1.weekBackUsecase)(reviewRepository)(review);
            res.status(200).json(newReview);
        }
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.updatedReviewController = updatedReviewController;
