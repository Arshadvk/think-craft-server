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
const error_1 = require("../../../utils/error");
const advisor_1 = require("../../database/model/advisor/advisor");
const AdvisorRepositoryImpl = (AdvisorModel) => {
    const createAdvisor = (advisorData) => __awaiter(void 0, void 0, void 0, function* () {
        const newAdvisor = yield advisor_1.advisorModel.create(advisorData);
        return newAdvisor;
    });
    const findAdvisorByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const advisor = yield advisor_1.advisorModel.findOne({ email });
        return advisor;
    });
    const setAdvisorPassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
        const advisor = yield advisor_1.advisorModel.findOneAndUpdate({ _id: id }, { $set: { password: password } });
        return advisor;
    });
    const getAllAdvisor = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        if (filterData.search) {
            const allAdvisors = yield advisor_1.advisorModel.find(filterData.search);
            return allAdvisors;
        }
        else {
            const allAdvisors = yield advisor_1.advisorModel.find(filterData);
            return allAdvisors;
        }
    });
    const updateIsBlock = (userId, action) => __awaiter(void 0, void 0, void 0, function* () {
        let isBlocked;
        if (action === "block")
            isBlocked = true;
        if (action === "unblock")
            isBlocked = false;
        const advisor = yield advisor_1.advisorModel.findByIdAndUpdate(userId, { isBlocked }, { new: true });
        return isBlocked;
    });
    const updateAdvisorProfile = (userId, reviwerData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(userId);
        console.log(reviwerData);
        const advisor = yield advisor_1.advisorModel.findByIdAndUpdate(userId, reviwerData, { new: true });
        if (!advisor)
            throw new error_1.AppError('somthing went wrong when block the user ', 500);
        return advisor;
    });
    const findAdvisorById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const advisor = yield advisor_1.advisorModel.findById(userId);
        return advisor;
    });
    const findAvilableAdvisor = () => __awaiter(void 0, void 0, void 0, function* () {
        const advisors = yield advisor_1.advisorModel.find({}, { _id: 1 });
        const advisorIds = advisors.map((advisor) => advisor._id);
        return advisorIds;
    });
    return {
        createAdvisor,
        findAdvisorByEmail,
        setAdvisorPassword,
        getAllAdvisor,
        updateIsBlock,
        updateAdvisorProfile,
        findAdvisorById,
        findAvilableAdvisor
    };
};
exports.default = AdvisorRepositoryImpl;
