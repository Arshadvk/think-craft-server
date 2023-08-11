import express  from "express";
import { passwordCreationReviewer,  } from "../controller/reviewer/reviewerManagment";
import { reviewerLoginController } from "../controller/reviewer/reviewerLoginController";
import { slotCreateController } from "../controller/reviewer/slot/slotCreateController";
import { getReviewerProfileController, reviewerProfileController } from "../controller/reviewer/reviewerProfileManagment";
import { reviewerAuthToken } from "../middlewares/authMiddleware";
import { reviewerProfileMiddleware } from "../middlewares/profileMiddleware";
import { getAllDomainController } from "../controller/admin/domain/domainController";


const reviewerRoute = express.Router()

reviewerRoute.post('/login' ,reviewerLoginController)
reviewerRoute.put('/setpassword/:id',reviewerProfileMiddleware , passwordCreationReviewer)
reviewerRoute.put('/edit-profile/:id' ,reviewerProfileMiddleware , reviewerProfileController)
reviewerRoute.post('/add-slot' ,reviewerAuthToken , slotCreateController)
reviewerRoute.get('/profile', reviewerAuthToken , getReviewerProfileController )
reviewerRoute.get('/get-domaim-info/:id' , reviewerProfileMiddleware , getAllDomainController )

export default reviewerRoute