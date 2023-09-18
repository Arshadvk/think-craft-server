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
exports.getStudentHomeController = exports.getStudentProfileController = exports.studentProfileController = void 0;
const student_js_1 = require("../../../domain/entities/student/student.js");
const review_js_1 = require("../../../infra/database/model/review/review.js");
const student_js_2 = require("../../../infra/database/model/student/student.js");
const advisor_js_1 = require("../../../infra/database/model/advisor/advisor.js");
const reviewRepository_js_1 = __importDefault(require("../../../infra/repositories/review/reviewRepository.js"));
const reviewCreateUsecase_js_1 = require("../../../app/usecase/review/reviewCreateUsecase.js");
const studentRepository_js_1 = __importDefault(require("../../../infra/repositories/student/studentRepository.js"));
const advisorRepository_js_1 = __importDefault(require("../../../infra/repositories/advisor/advisorRepository.js"));
const reviewFindUsecase_js_1 = require("../../../app/usecase/review/reviewFindUsecase.js");
const studentProfile_js_1 = require("../../../app/usecase/student/studentProfile.js");
const studentRepository = (0, studentRepository_js_1.default)(student_js_2.studentModel);
const reviewRepository = (0, reviewRepository_js_1.default)(review_js_1.reviewModel);
const advisorRepository = (0, advisorRepository_js_1.default)(advisor_js_1.advisorModel);
const studentProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.student) === null || _b === void 0 ? void 0 : _b._id;
        const data = req.body.userData;
        const studentData = {
            number: data.number,
            address: data.address,
            gender: data.gender,
            qualification: data.qualification,
            dob: data.dob,
            domain: data.domain,
            isProfileVerified: true
        };
        const student = yield (0, studentProfile_js_1.studentProfileUsecase)(studentRepository)(userId, studentData);
        if (student) {
            const review = {
                week: 1,
                student: userId,
            };
            const newReview = yield (0, reviewCreateUsecase_js_1.createReviewUsecase)(reviewRepository, advisorRepository, studentRepository)(userId, review);
            const token = (0, student_js_1.createToken)(student);
            res.status(200).json({ token: token });
        }
        else
            res.status(200).json({ message: 'User failed' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.studentProfileController = studentProfileController;
const getStudentProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const studentId = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.student) === null || _d === void 0 ? void 0 : _d._id;
        const student = yield (0, studentProfile_js_1.getStudentProfileUsecase)(studentRepository)(studentId);
        res.status(200).json(student);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getStudentProfileController = getStudentProfileController;
const getStudentHomeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const studentId = (_f = (_e = req.user) === null || _e === void 0 ? void 0 : _e.student) === null || _f === void 0 ? void 0 : _f._id;
        const reviewId = req.body.id;
        const review = yield (0, reviewFindUsecase_js_1.getReviewListByWeekUseCase)(reviewRepository, studentRepository)(studentId);
        res.status(200).json(review);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getStudentHomeController = getStudentHomeController;
