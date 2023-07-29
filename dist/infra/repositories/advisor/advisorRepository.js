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
    const setAdvisorPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const advisor = yield advisor_1.advisorModel.updateOne({ email: email }, { $set: { password: password } });
        return advisor;
    });
    return { createAdvisor, findAdvisorByEmail, setAdvisorPassword };
};
exports.default = AdvisorRepositoryImpl;
