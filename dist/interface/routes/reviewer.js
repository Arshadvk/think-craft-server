"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewerManagment_1 = require("../controller/reviewer/reviewerManagment");
const reviewerLoginController_1 = require("../controller/reviewer/reviewerLoginController");
const slotCreateController_1 = require("../controller/reviewer/slot/slotCreateController");
const reviewerProfileManagment_1 = require("../controller/reviewer/reviewerProfileManagment");
const reviewerRoute = express_1.default.Router();
reviewerRoute.post('/login', reviewerLoginController_1.reviewerLoginController);
reviewerRoute.put('/setpassword', reviewerManagment_1.passwordCreationReviewer);
reviewerRoute.put('/edit-profile/:id', reviewerProfileManagment_1.reviewerProfileController);
reviewerRoute.post('/add-slot', slotCreateController_1.slotCreateController);
reviewerRoute.get('/profile/:id', reviewerProfileManagment_1.getReviewerProfileController);
exports.default = reviewerRoute;
