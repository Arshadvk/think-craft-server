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
exports.findStudentManifestController = void 0;
const review_1 = require("../../../infra/database/model/review/review");
const reviewFindUsecase_1 = require("../../../app/usecase/review/reviewFindUsecase");
const reviewRepository_1 = __importDefault(require("../../../infra/repositories/review/reviewRepository"));
const reviewRepository = (0, reviewRepository_1.default)(review_1.reviewModel);
const findStudentManifestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.student) === null || _b === void 0 ? void 0 : _b._id;
        let filterData = {};
        filterData.student = userId;
        const reviews = yield (0, reviewFindUsecase_1.getReviewListUseCase)(reviewRepository)(filterData);
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.findStudentManifestController = findStudentManifestController;
