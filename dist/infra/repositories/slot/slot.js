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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const slot_1 = require("../../database/model/slot/slot");
const slotRepositoryImpl = (SlotModel) => {
    const createNewSlot = (reviewerId, slotes) => __awaiter(void 0, void 0, void 0, function* () {
        const isSlotExist = yield SlotModel.findOne({ reviewer: reviewerId });
        if (!isSlotExist) {
            const newSlot = new SlotModel({
                reviewer: reviewerId,
                slotes: slotes
            });
            const createdSlot = yield newSlot.save();
            return createdSlot;
        }
        slotes.forEach(slot => {
            isSlotExist.slotes.push(slot);
        });
        yield isSlotExist.save();
        return isSlotExist;
    });
    const findSlot = (slotDate, startingTime, endingTime, reviewerId) => __awaiter(void 0, void 0, void 0, function* () {
        const slot = yield slot_1.slotModel.findOne({
            reviewer: reviewerId,
            'slotes.date': new Date(slotDate),
            $or: [
                {
                    $and: [
                        { 'slotes.slot_time': { $gte: startingTime } },
                        { 'slotes.slot_time': { $lt: endingTime } }
                    ]
                }, {
                    $and: [
                        { 'slotes.slot_time': { $gte: new Date(`2000-01-01 ${startingTime}`).toLocaleTimeString(`en-US`, { hour: 'numeric', minute: "2-digit", hour12: false }) } },
                        { 'slotes.slot_time': { $lt: new Date(`2000-01-01 ${endingTime}`).toLocaleTimeString(`en-US`, { hour: 'numeric', minute: "2-digit", hour12: false }) } },
                    ]
                }
            ]
        });
        return slot;
    });
    const findSlotByRevId = (reviewerId) => __awaiter(void 0, void 0, void 0, function* () {
        const crr = (0, moment_1.default)().format('YYYY-MM-DD');
        const currentDate = new Date(crr);
        yield SlotModel.findOneAndUpdate({ reviewer: reviewerId }, {
            $pull: { slotes: { date: { $lt: currentDate } } },
        });
        const slot = yield SlotModel.findOne({ reviewer: reviewerId });
        return slot;
    });
    const updateSlot = (reviewerId, slotId) => __awaiter(void 0, void 0, void 0, function* () {
        const crr = (0, moment_1.default)().format('YYYY-MM-DD');
        const currentDate = new Date(crr);
        yield SlotModel.findOneAndUpdate({ reviewer: reviewerId }, {
            $pull: { slotes: { date: { $lt: currentDate } } },
        });
        const updatedSlot = yield SlotModel.findOneAndUpdate({ reviewer: reviewerId, 'slotes._id': slotId }, // Match the document with reviewerId and slotId
        {
            $set: {
                'slotes.$[element].isBooked': true // Update the isBooked field within the matched slot
            }
        }, {
            arrayFilters: [{ 'element._id': slotId }],
            new: true // Return the updated document
        });
        console.log(updatedSlot);
        console.log("hr" + updatedSlot);
        return updatedSlot;
    });
    return {
        createNewSlot,
        findSlot,
        findSlotByRevId,
        updateSlot
    };
};
exports.default = slotRepositoryImpl;
