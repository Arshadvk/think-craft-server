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
exports.bookSlotController = exports.getSlotsController = exports.slotCreateController = void 0;
const moment_1 = __importDefault(require("moment"));
const error_1 = require("../../../../utils/error");
const slot_1 = require("../../../../infra/database/model/slot/slot");
const slot_2 = __importDefault(require("../../../../infra/repositories/slot/slot"));
const review_1 = require("../../../../infra/database/model/review/review");
const student_1 = require("../../../../infra/database/model/student/student");
const reviewUpdateUsecase_1 = require("../../../../app/usecase/review/reviewUpdateUsecase");
const studentRepository_1 = __importDefault(require("../../../../infra/repositories/student/studentRepository"));
const reviewRepository_1 = __importDefault(require("../../../../infra/repositories/review/reviewRepository"));
const slotUsecase_1 = require("../../../../app/usecase/reviewer/slot/slotUsecase");
const slotRepository = (0, slot_2.default)(slot_1.slotModel);
const reviewRepository = (0, reviewRepository_1.default)(review_1.reviewModel);
const studentRepository = (0, studentRepository_1.default)(student_1.studentModel);
const slotCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    try {
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.reviewer) === null || _b === void 0 ? void 0 : _b._id;
        console.log(userId);
        const date = (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d.date;
        const startTime = (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.values) === null || _f === void 0 ? void 0 : _f.timeStart;
        const endTime = (_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.values) === null || _h === void 0 ? void 0 : _h.timeEnd;
        const perReview = (_k = (_j = req.body) === null || _j === void 0 ? void 0 : _j.values) === null || _k === void 0 ? void 0 : _k.reviewTime;
        const startingTime = (0, moment_1.default)(startTime, 'h:mm A');
        const endingTime = (0, moment_1.default)(endTime, 'h:mm A');
        const slotDate = (0, moment_1.default)(date);
        const currentDate = new Date();
        const slot = (_l = req.body) === null || _l === void 0 ? void 0 : _l.values;
        console.log(slot);
        if (!slotDate || !startingTime || !endingTime || !perReview) {
            throw new error_1.AppError('All fields are required', 400);
        }
        const expectedEndingTime = startingTime.clone().add(perReview, 'minutes');
        if (endingTime.isSameOrBefore(expectedEndingTime)) {
            throw new error_1.AppError('Ending time must be greater than starting time plus slot duration', 400);
        }
        if (endingTime.isBefore(startingTime)) {
            throw new error_1.AppError('Ending time cannot be less than starting time', 400);
        }
        const newSlot = yield (0, slotUsecase_1.createSlotUsecase)(slotRepository)(userId, date, startTime, endTime, perReview);
        console.log(newSlot);
        res.json(newSlot);
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.slotCreateController = slotCreateController;
const getSlotsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o, _p;
    try {
        const reviewerId = (_m = req.params.id) !== null && _m !== void 0 ? _m : (_p = (_o = req.user) === null || _o === void 0 ? void 0 : _o.reviewer) === null || _p === void 0 ? void 0 : _p._id;
        const slot = yield (0, slotUsecase_1.getSlotUsecase)(slotRepository)(reviewerId);
        console.log(slot);
        res.status(200).json(slot);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getSlotsController = getSlotsController;
const bookSlotController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const values = req.body.value;
        console.log(values);
        const slotId = values === null || values === void 0 ? void 0 : values.slot;
        const reviewerId = values === null || values === void 0 ? void 0 : values.reviewer;
        const reviewId = values === null || values === void 0 ? void 0 : values.reviewId;
        const slot = yield (0, slotUsecase_1.updateSlotUsecase)(slotRepository)(reviewerId, slotId);
        if (slot) {
            console.log(slot);
            const reviewUpdatedData = {
                reviewer: reviewerId,
                status: 'review-scheduled',
                day: slot.slotes[0].slot_date,
                time: slot.slotes[0].slot_time
            };
            const review = yield (0, reviewUpdateUsecase_1.UpdateReviewUsecase)(reviewRepository)(reviewId, reviewUpdatedData);
            console.log(review);
            res.status(200).json({ review });
        }
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.bookSlotController = bookSlotController;
