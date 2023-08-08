import { MongoDBSlot, slotModel } from "../../../database/model/reviewer/slot/slot";

export type SlotRepository = {
    createSlot: (slotData: any) => Promise<any>

}

const slotRepositoryImpl = (SlotModel: MongoDBSlot): SlotRepository => {
    
    const createSlot = async (slotData: any): Promise<any> => {
        const newSlot = await slotModel.create(slotData)
        return newSlot

    }
    
    return {
        createSlot
    }
}

export default slotRepositoryImpl 