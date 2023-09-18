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
exports.blockReviewerController = exports.getAllReviewerSearchFilterSortController = exports.passwordCreationReviewer = exports.createReviewerController = void 0;
const error_1 = require("../../../utils/error");
const reviewer_1 = require("../../../infra/database/model/reviewer/reviewer");
const setPassword_1 = require("../../../app/usecase/reviewer/setPassword");
const block_unblock_1 = require("../../../app/usecase/admin/reviewer/block-unblock");
const reviewerRepository_1 = __importDefault(require("../../../infra/repositories/reviewer/reviewerRepository"));
const createReviewer_1 = require("../../../app/usecase/admin/reviewer/createReviewer");
const reviewerRepository = (0, reviewerRepository_1.default)(reviewer_1.reviewerModel);
const createReviewerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewerData = req.body;
        console.log(reviewerData);
        const newReviewer = yield (0, createReviewer_1.createReviewerUsecase)(reviewerRepository)(reviewerData);
        console.log(newReviewer);
        res.status(200).send({ message: "reviewer created succussfully" });
    }
    catch (error) {
    }
});
exports.createReviewerController = createReviewerController;
const passwordCreationReviewer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const reviewerId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.reviewer) === null || _b === void 0 ? void 0 : _b._id;
        const reviewerData = req.body;
        const newPassword = yield (0, setPassword_1.setPasswordUsecaseReviewer)(reviewerRepository)(reviewerData, reviewerId);
        res.status(200).send({ message: "password change successfully" });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.passwordCreationReviewer = passwordCreationReviewer;
const getAllReviewerSearchFilterSortController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sortCriteria;
        let filterData = {};
        if (req.query.search) {
            filterData.search = {
                $or: [{ email: { $regex: req.query.search, $options: 'i' } },
                    { name: { $regex: req.query.search, $options: 'i' } }
                ]
            };
        }
        if (req.query.domain)
            filterData.domain = req.query.domain;
        console.log(filterData.domain);
        const reviewerList = yield (0, createReviewer_1.getAllReviewerUsecase)(reviewerRepository)(filterData);
        res.status(200).json(reviewerList);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getAllReviewerSearchFilterSortController = getAllReviewerSearchFilterSortController;
const blockReviewerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        const action = req.body.action;
        if (!userId || !action)
            throw new error_1.AppError("not found", 404);
        const blocked = yield (0, block_unblock_1.blockReviewerUsecase)(reviewerRepository)(userId, action);
        if (blocked === null)
            throw new error_1.AppError("somthing went wrong while fetch the users", 500);
        if (blocked === true) {
            res.status(200).json({ message: 'User blocked succesfully' });
            return;
        }
        else if (blocked === false) {
            res.status(200).json({ message: 'User unblocked succesfully' });
            return;
        }
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.blockReviewerController = blockReviewerController;
