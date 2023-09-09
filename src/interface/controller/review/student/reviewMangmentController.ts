import { Request, Response } from "express";
import cloudinary from 'cloudinary'

export const updateTaskByStudent =async (req:Request , res : Response) => {
    try {
        
      } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' })   
    }
}