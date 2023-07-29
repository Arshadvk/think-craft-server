import express  from "express";
import { passwordCreationAdvisor } from "../controller/advisor/advisorMangment";


const advisorRoute = express.Router()

advisorRoute.post('/login')
advisorRoute.post('/setpassword' , passwordCreationAdvisor)


export default advisorRoute