import express  from "express";
import { passwordCreationReviewer,  } from "../controller/reviewer/reviewerManagment";
import { reviewerLoginController } from "../controller/reviewer/reviewerLoginController";
import { slotCreateController } from "../controller/reviewer/slot/slotCreateController";
import { getReviewerProfileController, reviewerProfileController } from "../controller/reviewer/reviewerProfileManagment";


const reviewerRoute = express.Router()

reviewerRoute.post('/login' ,reviewerLoginController)
reviewerRoute.put('/setpassword',passwordCreationReviewer)
reviewerRoute.put('/edit-profile/:id' , reviewerProfileController)
reviewerRoute.post('/add-slot' , slotCreateController)
reviewerRoute.get('/profile/:id' , getReviewerProfileController )


export default reviewerRoute