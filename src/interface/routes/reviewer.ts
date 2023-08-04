import express  from "express";
import { passwordCreationReviewer, reviewerProfileController } from "../controller/reviewer/reviewerManagment";
import { reviewerLoginController } from "../controller/reviewer/reviewerLoginController";


const reviewerRoute = express.Router()

reviewerRoute.post('/login' ,reviewerLoginController)
reviewerRoute.put('/setpassword',passwordCreationReviewer)
reviewerRoute.put('/edit-profile' , reviewerProfileController)

export default reviewerRoute