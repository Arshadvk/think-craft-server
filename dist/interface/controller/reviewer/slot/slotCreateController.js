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
exports.slotCreateController = void 0;
const slot_1 = require("../../../../infra/database/model/reviewer/slot/slot");
const slot_2 = __importDefault(require("../../../../infra/repositories/reviewer/slot/slot"));
const slotCreateUsecase_1 = require("../../../../app/usecase/reviewer/slot/slotCreateUsecase");
const slotRepository = (0, slot_2.default)(slot_1.slotModel);
const slotCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slot = req.body;
        console.log(slot);
        const newSlot = yield (0, slotCreateUsecase_1.addSlotUsecase)(slotRepository)(slot);
        res.status(200).json({ message: "add successfull" });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ error: error });
    }
});
exports.slotCreateController = slotCreateController;
