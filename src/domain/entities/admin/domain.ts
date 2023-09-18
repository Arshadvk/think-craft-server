import { ObjectId } from "mongoose";
import { AppError } from "../../../utils/error.js";

export interface Domain{
    _id:ObjectId,
    name:string ,
    create_at : string
}

export const validateDomainData = (domainName:string):string=>{
    if(!domainName) throw new AppError("Domain name is requred" , 400)

    return domainName
}