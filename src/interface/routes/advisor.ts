import express  from "express";
import {  passwordCreationAdvisor } from "../controller/advisor/advisorMangment";
import { advisorLogin } from "../controller/advisor/advisorLoginController";
import { advisorProfileController, getAdvisorProfileController } from "../controller/advisor/advisorProfileManagment";
import { advisorAuthToken } from "../middlewares/authMiddleware";
import { advisorProfileMiddleware } from "../middlewares/profileMiddleware";
import { getSlotsController } from "../controller/reviewer/slot/slotCreateController";


const advisorRoute = express.Router()

advisorRoute.post('/login' , advisorLogin)
advisorRoute.put('/set-password/:id' ,advisorProfileMiddleware, passwordCreationAdvisor)
advisorRoute.put('/set-profile/:id' , advisorProfileMiddleware ,  advisorProfileController)
advisorRoute.put('/edit-profile' , advisorAuthToken  , advisorProfileController )
advisorRoute.get('/profile' , advisorAuthToken ,  getAdvisorProfileController)
advisorRoute.get('slots/:id' , advisorAuthToken , getSlotsController)

export default advisorRoute