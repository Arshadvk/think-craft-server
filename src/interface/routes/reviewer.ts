import express from "express";
import { reviewerAuthToken } from "../middlewares/authMiddleware.js";
import { reviewerProfileMiddleware } from "../middlewares/profileMiddleware.js";
import { getAllDomainController } from "../controller/admin/domain/domainController.js";
import { passwordCreationReviewer, } from "../controller/reviewer/reviewerManagment.js";
import { getSlotsController, slotCreateController } from "../controller/reviewer/slot/slotCreateController.js";
import { findReviewController, updateReviewController } from "../controller/review/reviewMangmentController.js";
import { reviewerChangePassword, reviewerLoginController } from "../controller/reviewer/reviewerLoginController.js";
import { getReviewerProfileController, reviewerProfileController } from "../controller/reviewer/reviewerProfileManagment.js";


const reviewerRoute = express.Router()

reviewerRoute.post('/login', reviewerLoginController)
reviewerRoute.put('/set-password/:id', reviewerProfileMiddleware, passwordCreationReviewer)
reviewerRoute.put('/set-profile/:id', reviewerProfileMiddleware, reviewerProfileController)
reviewerRoute.put('/edit-profile', reviewerAuthToken, reviewerProfileController)
reviewerRoute.put('/update-password', reviewerAuthToken, reviewerChangePassword)
reviewerRoute.post('/add-slot', reviewerAuthToken, slotCreateController)
reviewerRoute.get('/profile', reviewerAuthToken, getReviewerProfileController)
reviewerRoute.get('/review-list', reviewerAuthToken, findReviewController)
reviewerRoute.get('/slot-list', reviewerAuthToken, getSlotsController)
reviewerRoute.get('/get-domaim-info/:id', reviewerProfileMiddleware, getAllDomainController)
reviewerRoute.put('/update-review-details', reviewerAuthToken, updateReviewController)
export default reviewerRoute