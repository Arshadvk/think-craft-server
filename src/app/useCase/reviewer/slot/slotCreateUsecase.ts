import { SlotRepository } from "../../../../infra/repositories/reviewer/slot/slot";

export const addSlotUsecase = (slotRepository: SlotRepository)=>{
    return async (slotData:any):Promise<any>=>{
        const newSlot : any = await slotRepository.createSlot(slotData) 
        return newSlot
    }
}