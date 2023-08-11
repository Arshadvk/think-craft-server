import express  from "express";
import {  passwordCreationAdvisor } from "../controller/advisor/advisorMangment";
import { advisorLogin } from "../controller/advisor/advisorLoginController";
import { advisorProfileController, getAdvisorProfileController } from "../controller/advisor/advisorProfileManagment";
import { advisorAuthToken } from "../middlewares/authMiddleware";
import { advisorProfileMiddleware } from "../middlewares/profileMiddleware";


const advisorRoute = express.Router()

advisorRoute.post('/login' , advisorLogin)
advisorRoute.put('/setpassword/:id' ,advisorProfileMiddleware, passwordCreationAdvisor)
advisorRoute.put('/edit-profile/:id' , advisorProfileMiddleware ,  advisorProfileController)
advisorRoute.get('/profile' , advisorAuthToken ,  getAdvisorProfileController)

export default advisorRoute