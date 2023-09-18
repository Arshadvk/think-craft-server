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
exports.updateReviewController = exports.findOneReviewController = exports.findReviewController = void 0;
const review_js_1 = require("../../../infra/database/model/review/review.js");
const student_js_1 = require("../../../infra/database/model/student/student.js");
const advisor_js_1 = require("../../../infra/database/model/advisor/advisor.js");
const reviewUpdateUsecase_js_1 = require("../../../app/usecase/review/reviewUpdateUsecase.js");
const studentRepository_js_1 = __importDefault(require("../../../infra/repositories/student/studentRepository.js"));
const advisorRepository_js_1 = __importDefault(require("../../../infra/repositories/advisor/advisorRepository.js"));
const reviewFindUsecase_js_1 = require("../../../app/usecase/review/reviewFindUsecase.js");
const reviewRepository_js_1 = __importDefault(require("../../../infra/repositories/review/reviewRepository.js"));
const reviewRepository = (0, reviewRepository_js_1.default)(review_js_1.reviewModel);
const advisorRepository = (0, advisorRepository_js_1.default)(advisor_js_1.advisorModel);
const studentRepository = (0, studentRepository_js_1.default)(student_js_1.studentModel);
const findReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const status = req.query.type;
        const home = req.query.home;
        const advisor = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.advisor) === null || _b === void 0 ? void 0 : _b._id;
        const reviewer = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.reviewer) === null || _d === void 0 ? void 0 : _d._id;
        const student = req.query.student;
        const id = req.query.id;
        let filterData = {};
        if (home) {
            filterData.status = "review-scheduled";
        }
        if (status) {
            filterData.status = "not-scheduled";
        }
        if (advisor) {
            filterData.advisor = advisor;
        }
        if (reviewer) {
            filterData.reviewer = reviewer;
        }
        if (student) {
            filterData.student = student;
        }
        if (id) {
            filterData._id = id;
        }
        const reviews = yield (0, reviewFindUsecase_js_1.getReviewListUseCase)(reviewRepository)(filterData);
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.findReviewController = findReviewController;
const findOneReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const userId = (_f = (_e = req.user) === null || _e === void 0 ? void 0 : _e.student) === null || _f === void 0 ? void 0 : _f._id;
        const week = req.query.week;
        const review = yield (0, reviewFindUsecase_js_1.getReviewByIdUsecase)(reviewRepository)(week);
        res.status(200).json(review);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.findOneReviewController = findOneReviewController;
const updateReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    try {
        console.log(req.body);
        let data = {};
        const value = (_g = req.body) === null || _g === void 0 ? void 0 : _g.value;
        if (value === null || value === void 0 ? void 0 : value.mark) {
            data.mark = value === null || value === void 0 ? void 0 : value.mark;
            data.status = "conducted";
        }
        const pendingTask = req.body.pendingTopic;
        if (pendingTask) {
            data.pendingTask = pendingTask;
        }
        const reviewId = (_h = req.body) === null || _h === void 0 ? void 0 : _h.id;
        const week = req.body.week;
        const updatedReview = yield (0, reviewUpdateUsecase_js_1.UpdateReviewUsecase)(reviewRepository)(reviewId, data);
        res.status(200).json(updatedReview);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.updateReviewController = updateReviewController;
