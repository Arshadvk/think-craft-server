import express  from "express";
import { passwordCreationReviewer, reviewerProfileController } from "../controller/reviewer/reviewerManagment";
import { reviewerLoginController } from "../controller/reviewer/reviewerLoginController";
import { slotCreateController } from "../controller/reviewer/slot/slotCreateController";


const reviewerRoute = express.Router()

reviewerRoute.post('/login' ,reviewerLoginController)
reviewerRoute.put('/setpassword',passwordCreationReviewer)
reviewerRoute.put('/edit-profile' , reviewerProfileController)
reviewerRoute.post('/add-slot' , slotCreateController)

export default reviewerRoute