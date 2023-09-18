import { Request, Response } from "express"
import cloudinary from '../../../../domain/service/cloudinary'
export const fileUpload = async (req : Request , res : Response) => {
    try {
        console.log(req.body);
        
      const file = req.body.file
        if(file){
           const uploadRes = await cloudinary.uploader.upload(file,{
                upload_preset : "samples"
            })
            if (uploadRes) {
                res.status(200).json({message: "success full"})
            }
        } res.status(404).json({message: "errror "})
    } catch (error) {
      
    }
  }