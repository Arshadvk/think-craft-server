import { ObjectId } from "mongoose";
import { Slot, slotes } from "../../../../domain/entities/slot/slot";
import { SlotRepository } from "../../../../infra/repositories/slot/slot";
import { AppError } from "../../../../utils/error";


export const createSlotUsecase = (slotRepository: SlotRepository) => {
    return async (reviewerId: string, date: string, startTime: string, endTime: string, slotDuration: number) => {

        const isSlotExist = await slotRepository.findSlot(date, startTime, endTime, reviewerId)
        console.log('slot data :', isSlotExist?.slotes.length);

        if (isSlotExist?.slotes.length) {
            console.log('slot data :', isSlotExist);

            throw new AppError('Slots already exist', 409)
        }

        const createdSlots = generateTimeSlots(startTime, endTime, slotDuration, date)
        const newSlot = await slotRepository.createNewSlot(reviewerId, createdSlots)
        return newSlot

        function generateTimeSlots(startTime: string, endTime: string, slotDuration: number, slotDate: string) {

            const slots = [];
            const start = new Date(`${slotDate} ${startTime}`);
            const end = new Date(`${slotDate} ${endTime}`);

            while (start < end) {
                const slotTime = start.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: "2-digit",
                    hour12: true
                });
                const slotData = {
                    slot_time: slotTime,
                    slot_date: date,
                    date: date,
                    isBooked: false
                }
                slots.push(slotData)
                start.setMinutes(start.getMinutes() + slotDuration);
            }
            return slots
        }
    }
}



export const getSlotUsecase = (slotRepository: SlotRepository) => {
    return async (reviewId: string): Promise<slotes[] | undefined> => {
        const slot: Slot | null = await slotRepository.findSlotByRevId(reviewId)
        const slotes: slotes[] | undefined = slot?.slotes

        return slotes
    }
}

export const updateSlotUsecase = (slotRepository: SlotRepository) => {
    return async (reviewerId: ObjectId, slotId: string): Promise<Slot | null> => {
        const slot: Slot | null = await slotRepository.updateSlot(reviewerId, slotId)
        console.log(slot);
        
        return slot
    }
}