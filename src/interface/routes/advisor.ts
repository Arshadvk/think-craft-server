import express  from "express";
import {  passwordCreationAdvisor } from "../controller/advisor/advisorMangment";
import { advisorLogin } from "../controller/advisor/advisorLoginController";
import { advisorProfileController, getAdvisorProfileController } from "../controller/advisor/advisorProfileManagment";


const advisorRoute = express.Router()

advisorRoute.post('/login' , advisorLogin)
advisorRoute.put('/setpassword' , passwordCreationAdvisor)
advisorRoute.put('/edit-profile/:id' , advisorProfileController)
advisorRoute.get('/profile/:id' , getAdvisorProfileController)

export default advisorRoute