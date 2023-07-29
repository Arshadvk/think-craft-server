import express  from "express";
import { passwordCreationReviewer } from "../controller/reviewer/reviewerManagment";
import { reviewerLoginController } from "../controller/reviewer/reviewerLoginController";


const reviewerRoute = express.Router()

reviewerRoute.post('/login' ,reviewerLoginController)
reviewerRoute.put('/setpassword',passwordCreationReviewer)

export default reviewerRoute