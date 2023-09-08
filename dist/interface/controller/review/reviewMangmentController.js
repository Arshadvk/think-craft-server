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
exports.findOneReviewDetailsController = exports.updateReviewController = exports.findOneReviewController = exports.findReviewController = void 0;
const reviewRepository_1 = __importDefault(require("../../../infra/repositories/review/reviewRepository"));
const reviewUsecase_1 = require("../../../app/usecase/review/reviewUsecase");
const review_1 = require("../../../infra/database/model/review/review");
const studentRepository_1 = __importDefault(require("../../../infra/repositories/student/studentRepository"));
const student_1 = require("../../../infra/database/model/student/student");
const advisorRepository_1 = __importDefault(require("../../../infra/repositories/advisor/advisorRepository"));
const advisor_1 = require("../../../infra/database/model/advisor/advisor");
const moment_1 = __importDefault(require("moment"));
const reviewRepository = (0, reviewRepository_1.default)(review_1.reviewModel);
const advisorRepository = (0, advisorRepository_1.default)(advisor_1.advisorModel);
const studentRepository = (0, studentRepository_1.default)(student_1.studentModel);
const findReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const type = req.query.type;
        console.log("first" + type);
        const advisor = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.advisor) === null || _b === void 0 ? void 0 : _b._id;
        const reviewer = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.reviewer) === null || _d === void 0 ? void 0 : _d._id;
        const student = req.query.id;
        let filterData = {};
        if (advisor) {
            if (type) {
                filterData.type = type;
            }
            filterData.advisor = advisor;
        }
        else if (reviewer) {
            filterData.reviewer = reviewer;
        }
        if (student) {
            filterData.student = student;
        }
        console.log("filter", filterData);
        const reviews = yield (0, reviewUsecase_1.getReviewListUseCase)(reviewRepository)(filterData);
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
        const review = yield (0, reviewUsecase_1.findOneReviewUsecase)(reviewRepository, studentRepository)(userId, week);
        console.log(review);
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
        const mark = (_g = req.body) === null || _g === void 0 ? void 0 : _g.mark;
        if (mark) {
            data.mark = mark;
        }
        const pendingTask = req.body.pendingTopic;
        if (pendingTask) {
            data.pendingTask = pendingTask;
        }
        const weekStatus = req.body.weekStatus;
        if (weekStatus) {
            data.weekStatus = weekStatus;
        }
        const student = (_h = req.body) === null || _h === void 0 ? void 0 : _h.student;
        const week = req.body.week;
        const updatedReview = yield (0, reviewUsecase_1.UpdateMarkUsecase)(reviewRepository)(student, week, data);
        console.log(mark);
        if (updatedReview && data.weekStatus === 'Week Repeat') {
        }
        else {
            const review = {
                date: (0, moment_1.default)().add(8, 'days').toDate(),
                week: week + 1
            };
            const newReview = yield (0, reviewUsecase_1.createReviewUsecase)(reviewRepository, advisorRepository, studentRepository)(student, review);
        }
        res.status(200).json(updatedReview);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.updateReviewController = updateReviewController;
const findOneReviewDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewsId = req.params.id;
        console.log(reviewsId);
        const review = yield (0, reviewUsecase_1.findOneReviewDetailsUseCase)(reviewRepository)(reviewsId);
        res.status(200).json(review);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.findOneReviewDetailsController = findOneReviewDetailsController;
