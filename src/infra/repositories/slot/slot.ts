import moment from "moment";
import { Slot, slotes } from "../../../domain/entities/slot/slot";
import { MongoDBSlot, slotModel } from "../../database/model/slot/slot";

export type SlotRepository = {
    createNewSlot: (reviewerId: string , slot:slotes[]) => Promise<Slot>
    findSlot : (slotDate : string , startingTime: string , endingTime :string , reviewerId:string) => Promise  <Slot | null>
    findSlotByRevId : (reviewerId : string) => Promise <Slot | null >
}

const slotRepositoryImpl = (SlotModel: MongoDBSlot): SlotRepository => {
    
    const createNewSlot = async (reviewerId: string , slotes : slotes[]): Promise<Slot> => {
        const isSlotExist = await SlotModel.findOne({reviewer : reviewerId})
        if (!isSlotExist) {
            const newSlot = new SlotModel({
                reviewer : reviewerId ,
                slotes : slotes
            })

            const createdSlot : Slot = await newSlot.save()
            return createdSlot
        }

        slotes.forEach(slot=>{
            isSlotExist.slotes.push(slot)
        })
        await isSlotExist.save()

        return isSlotExist
    }

    const findSlot =async (slotDate :string , startingTime : string , endingTime : string , reviewerId: string): Promise<Slot | null > => {
        const slot : Slot | null = await slotModel.findOne({
            reviewer : reviewerId ,
            'slotes.date' : new Date(slotDate),
            $or : [
                {
                    $and:[
                        {'slotes.slot_time' :{$gte : startingTime}},
                        {'slotes.slot_time' :{$lt : endingTime}}
                        
                    ]
                },{
                    $and : [
                        {'slotes.slot_time' : {$gte : new Date(`2000-01-01 ${startingTime}`).toLocaleTimeString(`en-US` , {hour : 'numeric' , minute : "2-digit" , hour12 : false})}},
                        {'slotes.slot_time' : {$lt : new Date(`2000-01-01 ${endingTime}`).toLocaleTimeString(`en-US` , {hour : 'numeric' , minute : "2-digit" , hour12 : false})}},
                    ]
                }
            ]
        })

        return slot
    }

    const findSlotByRevId =async (reviewerId:string):Promise <Slot | null> => {

        const crr = moment().format('YYYY-MM-DD');
        const currentDate = new Date(crr)
        await SlotModel.findOneAndUpdate({reviewer : reviewerId},{
            $pull : {slotes : {date :{$lt : currentDate}}},
        })
        
        const slot : Slot | null  = await SlotModel.findOne({reviewer : reviewerId})
        return slot
    } 
    
    return {
        createNewSlot ,
        findSlot ,
        findSlotByRevId
    }
}

export default slotRepositoryImpl 