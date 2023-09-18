import express from "express";
import { advisorAuthToken } from "../middlewares/authMiddleware";
import { advisorProfileMiddleware } from "../middlewares/profileMiddleware";
import { passwordCreationAdvisor } from "../controller/advisor/advisorMangment";
import { findReviewController } from "../controller/review/reviewMangmentController";
import { getReviewerProfileController } from "../controller/reviewer/reviewerProfileManagment";
import { advisorChangePassword, advisorLogin } from "../controller/advisor/advisorLoginController";
import { getAllReviewerSearchFilterSortController } from "../controller/reviewer/reviewerManagment";
import { bookSlotController, getSlotsController } from "../controller/reviewer/slot/slotCreateController";
import { advisorProfileController, getAdvisorProfileController } from "../controller/advisor/advisorProfileManagment";
import { createReviewController, updatedReviewController } from "../controller/review/advisor/reviewManagmentController";

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