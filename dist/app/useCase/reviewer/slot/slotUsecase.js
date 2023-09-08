"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSlotUsecase = exports.getSlotUsecase = exports.createSlotUsecase = void 0;
const error_1 = require("../../../../utils/error");
const createSlotUsecase = (slotRepository) => {
    return (reviewerId, date, startTime, endTime, slotDuration) => __awaiter(void 0, void 0, void 0, function* () {
        const isSlotExist = yield slotRepository.findSlot(date, startTime, endTime, reviewerId);
        console.log('slot data :', isSlotExist === null || isSlotExist === void 0 ? void 0 : isSlotExist.slotes.length);
        if (isSlotExist === null || isSlotExist === void 0 ? void 0 : isSlotExist.slotes.length) {
            console.log('slot data :', isSlotExist);
            throw new error_1.AppError('Slots already exist', 409);
        }
        const createdSlots = generateTimeSlots(startTime, endTime, slotDuration, date);
        const newSlot = yield slotRepository.createNewSlot(reviewerId, createdSlots);
        return newSlot;
        function generateTimeSlots(startTime, endTime, slotDuration, slotDate) {
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
                };
                slots.push(slotData);
                start.setMinutes(start.getMinutes() + slotDuration);
            }
            return slots;
        }
    });
};
exports.createSlotUsecase = createSlotUsecase;
const getSlotUsecase = (slotRepository) => {
    return (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
        const slot = yield slotRepository.findSlotByRevId(reviewId);
        const slotes = slot === null || slot === void 0 ? void 0 : slot.slotes;
        return slotes;
    });
};
exports.getSlotUsecase = getSlotUsecase;
const updateSlotUsecase = (slotRepository) => {
    return (reviewerId, slotId) => __awaiter(void 0, void 0, void 0, function* () {
        const slot = yield slotRepository.updateSlot(reviewerId, slotId);
        console.log(slot);
        return slot;
    });
};
exports.updateSlotUsecase = updateSlotUsecase;
