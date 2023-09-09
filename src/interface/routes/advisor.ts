import express  from "express";
import {  passwordCreationAdvisor } from "../controller/advisor/advisorMangment";
import { advisorLogin } from "../controller/advisor/advisorLoginController";
import { advisorProfileController, getAdvisorProfileController } from "../controller/advisor/advisorProfileManagment";
import { advisorAuthToken } from "../middlewares/authMiddleware";
import { advisorProfileMiddleware } from "../middlewares/profileMiddleware";
import { bookSlotController, getSlotsController } from "../controller/reviewer/slot/slotCreateController";
import { getAllReviewerSearchFilterSortController } from "../controller/reviewer/reviewerManagment";
import { findReviewController } from "../controller/review/reviewMangmentController";
import { getReviewerProfileController } from "../controller/reviewer/reviewerProfileManagment";
import { updatedReviewController } from "../controller/review/advisor/reviewManagmentController";


const advisorRoute = express.Router()

advisorRoute.post('/login' , advisorLogin)
advisorRoute.put('/set-password/:id' ,advisorProfileMiddleware, passwordCreationAdvisor)
advisorRoute.put('/set-profile/:id' , advisorProfileMiddleware ,  advisorProfileController)
advisorRoute.put('/edit-profile' , advisorAuthToken  , advisorProfileController )
advisorRoute.get('/profile' , advisorAuthToken ,  getAdvisorProfileController)
advisorRoute.get('/reviewer-list' , advisorAuthToken , getAllReviewerSearchFilterSortController)
advisorRoute.put('/update-review-details' , advisorAuthToken , updatedReviewController)
advisorRoute.get('/slots/:id' ,advisorAuthToken , getSlotsController)
advisorRoute.get('/reviewer-details/:id' , advisorAuthToken , getReviewerProfileController )
advisorRoute.get('/review-list' , advisorAuthToken ,findReviewController )
advisorRoute.put('/book-slot'  ,advisorAuthToken , bookSlotController )

export default advisorRoute