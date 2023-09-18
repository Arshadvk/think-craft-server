import express from "express";
import { advisorAuthToken } from "../middlewares/authMiddleware.js";
import { advisorProfileMiddleware } from "../middlewares/profileMiddleware.js";
import { passwordCreationAdvisor } from "../controller/advisor/advisorMangment.js";
import { findReviewController } from "../controller/review/reviewMangmentController.js";
import { getReviewerProfileController } from "../controller/reviewer/reviewerProfileManagment.js";
import { advisorChangePassword, advisorLogin } from "../controller/advisor/advisorLoginController.js";
import { getAllReviewerSearchFilterSortController } from "../controller/reviewer/reviewerManagment.js";
import { bookSlotController, getSlotsController } from "../controller/reviewer/slot/slotCreateController.js";
import { advisorProfileController, getAdvisorProfileController } from "../controller/advisor/advisorProfileManagment.js";
import { createReviewController, updatedReviewController } from "../controller/review/advisor/reviewManagmentController.js";

const advisorRoute = express.Router()

advisorRoute.post('/login', advisorLogin)
advisorRoute.put('/set-password/:id', advisorProfileMiddleware, passwordCreationAdvisor)
advisorRoute.put('/set-profile/:id', advisorProfileMiddleware, advisorProfileController)
advisorRoute.put('/edit-profile', advisorAuthToken, advisorProfileController)
advisorRoute.put('/update-password', advisorAuthToken, advisorChangePassword)
advisorRoute.get('/profile', advisorAuthToken, getAdvisorProfileController)
advisorRoute.get('/reviewer-list', advisorAuthToken, getAllReviewerSearchFilterSortController)
advisorRoute.put('/update-review-details', advisorAuthToken, updatedReviewController)
advisorRoute.put('/create-review', advisorAuthToken, createReviewController)
advisorRoute.get('/slots/:id', advisorAuthToken, getSlotsController)
advisorRoute.post('/send-messages', advisorAuthToken,)
advisorRoute.get('/reviewer-details/:id', advisorAuthToken, getReviewerProfileController)
advisorRoute.get('/review-list', advisorAuthToken, findReviewController)
advisorRoute.put('/book-slot', advisorAuthToken, bookSlotController)


export default advisorRoute