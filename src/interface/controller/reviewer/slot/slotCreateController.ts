import { Request, Response } from "express";
import { slotModel } from "../../../../infra/database/model/reviewer/slot/slot";
import slotRepositoryImpl from "../../../../infra/repositories/reviewer/slot/slot";
import { addSlotUsecase } from "../../../../app/usecase/reviewer/slot/slotCreateUsecase";

const slotRepository = slotRepositoryImpl(slotModel)

export const slotCreateController =async (req:Request , res : Response) => {
    try {
        const slot : any = req.body 
        console.log(slot);

        const newSlot = await addSlotUsecase(slotRepository)(slot)
        res.status(200).json({message:"add successfull"})
        
    }  catch (error : any) {
        console.log(error);
        
        res.status(200).json({error:error})

        
    }
}