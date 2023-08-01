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
exports.loginAdvisor = void 0;
const advisor_1 = require("../../../domain/entities/advisor/advisor");
const error_1 = require("../../../utils/error");
const loginAdvisor = (advisorRepository) => {
    return (advisor) => __awaiter(void 0, void 0, void 0, function* () {
        const isAdvisorExist = yield advisorRepository.findAdvisorByEmail(advisor.email);
        if (!isAdvisorExist)
            throw new error_1.AppError("user is not exist", 404);
        const AdvisorToken = yield (0, advisor_1.advisorLoginValidate)(advisor, isAdvisorExist);
        const verifiedAdvisor = {
            token: AdvisorToken,
            status: "advisor login successfully"
        };
        return verifiedAdvisor;
    });
};
exports.loginAdvisor = loginAdvisor;
