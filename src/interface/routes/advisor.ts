import express  from "express";
import { passwordCreationAdvisor } from "../controller/advisor/advisorMangment";
import { advisorLogin } from "../controller/advisor/advisorLoginController";


const advisorRoute = express.Router()

advisorRoute.post('/login' , advisorLogin)
advisorRoute.put('/setpassword' , passwordCreationAdvisor)


export default advisorRoute