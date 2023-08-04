import { ObjectId } from "mongoose";
import { AppError } from "../../../utils/error";

export interface Domain{
    _id:ObjectId,
    name:string
}

export const validateDomainData = (domainName:string):string=>{
    if(!domainName) throw new AppError("Domain name is requred" , 400)

    return domainName
}