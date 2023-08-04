import express  from "express";
import { advisorProfileController, passwordCreationAdvisor } from "../controller/advisor/advisorMangment";
import { advisorLogin } from "../controller/advisor/advisorLoginController";


const advisorRoute = express.Router()

advisorRoute.post('/login' , advisorLogin)
advisorRoute.put('/setpassword' , passwordCreationAdvisor)
advisorRoute.put('/edit-profile' , advisorProfileController)

export default advisorRoute