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
exports.getAllAdvisorUsecase = exports.createAdvisorUsecase = void 0;
const error_1 = require("../../../../utils/error");
const email_send_1 = require("../../../../domain/service/email_send");
const advisor_1 = require("../../../../domain/entities/advisor/advisor");
const createAdvisorUsecase = (advisorRepository) => {
    return function (advisorData) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAdvisor = yield advisorRepository.findAdvisorByEmail(advisorData.email);
            if (isAdvisor)
                throw new error_1.AppError("Advisor is already exist", 409);
            const newAdvisor = yield advisorRepository.createAdvisor(advisorData);
            console.log(newAdvisor);
            const token = (0, advisor_1.createAdvisorToken)(newAdvisor);
            const sended = (0, email_send_1.sendMail)(newAdvisor, "/advisor", token);
            console.log(sended);
        });
    };
};
exports.createAdvisorUsecase = createAdvisorUsecase;
const getAllAdvisorUsecase = (advisorRepository) => {
    return (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        const allAdvisor = yield advisorRepository.getAllAdvisor(filterData);
        return allAdvisor;
    });
};
exports.getAllAdvisorUsecase = getAllAdvisorUsecase;
