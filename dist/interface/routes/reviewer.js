"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewerManagment_1 = require("../controller/reviewer/reviewerManagment");
const reviewerLoginController_1 = require("../controller/reviewer/reviewerLoginController");
const reviewerRoute = express_1.default.Router();
reviewerRoute.post('/login', reviewerLoginController_1.reviewerLoginController);
reviewerRoute.put('/setpassword', reviewerManagment_1.passwordCreationReviewer);
reviewerRoute.put('/edit-profile', reviewerManagment_1.reviewerProfileController);
exports.default = reviewerRoute;
