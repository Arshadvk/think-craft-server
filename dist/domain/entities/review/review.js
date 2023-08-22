"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findReviewdata = void 0;
const moment_1 = __importDefault(require("moment"));
const findReviewdata = () => {
    const eightDaysFromNow = (0, moment_1.default)().add(8, 'days').toDate();
};
exports.findReviewdata = findReviewdata;
