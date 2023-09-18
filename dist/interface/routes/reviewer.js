"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = require("../middlewares/authMiddleware.js");
const profileMiddleware_js_1 = require("../middlewares/profileMiddleware.js");
const domainController_js_1 = require("../controller/admin/domain/domainController.js");
const reviewerManagment_js_1 = require("../controller/reviewer/reviewerManagment.js");
const slotCreateController_js_1 = require("../controller/reviewer/slot/slotCreateController.js");
const reviewMangmentController_js_1 = require("../controller/review/reviewMangmentController.js");
const reviewerLoginController_js_1 = require("../controller/reviewer/reviewerLoginController.js");
const reviewerProfileManagment_js_1 = require("../controller/reviewer/reviewerProfileManagment.js");
const reviewerRoute = express_1.default.Router();
reviewerRoute.post('/login', reviewerLoginController_js_1.reviewerLoginController);
reviewerRoute.put('/set-password/:id', profileMiddleware_js_1.reviewerProfileMiddleware, reviewerManagment_js_1.passwordCreationReviewer);
reviewerRoute.put('/set-profile/:id', profileMiddleware_js_1.reviewerProfileMiddleware, reviewerProfileManagment_js_1.reviewerProfileController);
reviewerRoute.put('/edit-profile', authMiddleware_js_1.reviewerAuthToken, reviewerProfileManagment_js_1.reviewerProfileController);
reviewerRoute.put('/update-password', authMiddleware_js_1.reviewerAuthToken, reviewerLoginController_js_1.reviewerChangePassword);
reviewerRoute.post('/add-slot', authMiddleware_js_1.reviewerAuthToken, slotCreateController_js_1.slotCreateController);
reviewerRoute.get('/profile', authMiddleware_js_1.reviewerAuthToken, reviewerProfileManagment_js_1.getReviewerProfileController);
reviewerRoute.get('/review-list', authMiddleware_js_1.reviewerAuthToken, reviewMangmentController_js_1.findReviewController);
reviewerRoute.get('/slot-list', authMiddleware_js_1.reviewerAuthToken, slotCreateController_js_1.getSlotsController);
reviewerRoute.get('/get-domaim-info/:id', profileMiddleware_js_1.reviewerProfileMiddleware, domainController_js_1.getAllDomainController);
reviewerRoute.put('/update-review-details', authMiddleware_js_1.reviewerAuthToken, reviewMangmentController_js_1.updateReviewController);
exports.default = reviewerRoute;
