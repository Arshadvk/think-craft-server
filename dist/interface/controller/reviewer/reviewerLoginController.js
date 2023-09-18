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
exports.reviewerChangePassword = exports.reviewerLoginController = void 0;
const reviewer_1 = require("../../../infra/database/model/reviewer/reviewer");
const reviewerRepository_1 = __importDefault(require("../../../infra/repositories/reviewer/reviewerRepository"));
const reviewerLogin_1 = require("../../../app/usecase/reviewer/reviewerLogin");
const reviewerRepository = (0, reviewerRepository_1.default)(reviewer_1.reviewerModel);
const reviewerLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewer = req.body;
        const ReviewerToken = yield (0, reviewerLogin_1.loginReviewer)(reviewerRepository)(reviewer);
        res.status(200).json({ message: ReviewerToken });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.reviewerLoginController = reviewerLoginController;
const reviewerChangePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reveiwer = req.user.reveiwer._id;
        const value = req.body.value;
        const updateReviewer = yield (0, reviewerLogin_1.changeReviewerPassword)(reviewerRepository)(reveiwer, value);
        res.status(200).json(updateReviewer);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.reviewerChangePassword = reviewerChangePassword;
