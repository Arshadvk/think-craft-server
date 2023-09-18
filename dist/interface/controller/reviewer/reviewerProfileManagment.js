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
exports.getReviewerProfileController = exports.reviewerProfileController = void 0;
const reviewer_1 = require("../../../infra/database/model/reviewer/reviewer");
const reviewerRepository_1 = __importDefault(require("../../../infra/repositories/reviewer/reviewerRepository"));
const reviewerProfile_1 = require("../../../app/usecase/reviewer/reviewerProfile");
const reviewerRepository = (0, reviewerRepository_1.default)(reviewer_1.reviewerModel);
const reviewerProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.reviewer) === null || _b === void 0 ? void 0 : _b._id;
        const data = req.body.userData;
        const reviewerData = {
            number: data.number,
            address: data.address,
            age: data === null || data === void 0 ? void 0 : data.age,
            dob: data.dob,
            gender: data === null || data === void 0 ? void 0 : data.gender,
            qualification: data === null || data === void 0 ? void 0 : data.qualification,
            domain: data === null || data === void 0 ? void 0 : data.domains,
            isProfileVerified: true
        };
        const reviewer = yield (0, reviewerProfile_1.reviewerProfileUsecase)(reviewerRepository)(userId, reviewerData);
        if (reviewer)
            res.status(200).json(reviewer);
        else
            res.status(200).json({ message: 'User failed' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.reviewerProfileController = reviewerProfileController;
const getReviewerProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    try {
        const reviewerId = (_e = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.reviewer) === null || _d === void 0 ? void 0 : _d._id) !== null && _e !== void 0 ? _e : (_f = req.params) === null || _f === void 0 ? void 0 : _f.id;
        console.log("reviewer", req.params.id);
        console.log(reviewerId);
        const reviewer = yield (0, reviewerProfile_1.getReviewerProfileUsecase)(reviewerRepository)(reviewerId);
        console.log(reviewer);
        res.status(200).json(reviewer);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getReviewerProfileController = getReviewerProfileController;
