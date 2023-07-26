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
exports.createReviewerUsecase = void 0;
const error_1 = require("../../../../utils/error");
const nodemailer_1 = require("../../../../utils/nodemailer");
const createReviewerUsecase = (reviewerRepository) => {
    return (reviwerData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("fgasdvg");
        const isReviewer = yield reviewerRepository.findReviewerByEmail(reviwerData.email);
        if (isReviewer)
            throw new error_1.AppError("Revieweer is already exist", 409);
        const newReviewer = yield reviewerRepository.createReviewer(reviwerData);
        console.log(newReviewer);
        const sendMail = (0, nodemailer_1.SendMail)(reviwerData, "reviewer");
        console.log(sendMail);
    });
};
exports.createReviewerUsecase = createReviewerUsecase;
