import express  from "express";


const studentRoute = express.Router()

studentRoute.post('/login')
studentRoute.post('/setpassword')

export default studentRoute