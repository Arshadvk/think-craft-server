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
exports.getAllReviewerUsecase = exports.createReviewerUsecase = void 0;
const error_1 = require("../../../../utils/error");
const email_send_1 = require("../../../../domain/service/email_send");
const reviewer_1 = require("../../../../domain/entities/reviewer/reviewer");
const createReviewerUsecase = (reviewerRepository) => {
    return (reviwerData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("fgasdvg");
        const isReviewer = yield reviewerRepository.findReviewerByEmail(reviwerData.email);
        if (isReviewer)
            throw new error_1.AppError("Revieweer is already exist", 409);
        const newReviewer = yield reviewerRepository.createReviewer(reviwerData);
        console.log(newReviewer);
        const token = (0, reviewer_1.createReviewerToken)(newReviewer);
        const sended = (0, email_send_1.sendMail)(newReviewer, "/reviewer", token);
    });
};
exports.createReviewerUsecase = createReviewerUsecase;
const getAllReviewerUsecase = (reviewerRepository) => {
    return (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        const allReviewer = yield reviewerRepository.getAllReviewer(filterData);
        return allReviewer;
    });
};
exports.getAllReviewerUsecase = getAllReviewerUsecase;
