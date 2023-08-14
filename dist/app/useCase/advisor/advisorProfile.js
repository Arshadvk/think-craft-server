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
exports.getAdvisorProfileUsecase = exports.advisorProfileUsecase = void 0;
const advisorProfileUsecase = (advisorRepository) => {
    return (userId, advisorData) => __awaiter(void 0, void 0, void 0, function* () {
        const advisor = yield advisorRepository.updateAdvisorProfile(userId, advisorData);
        return advisor;
    });
};
exports.advisorProfileUsecase = advisorProfileUsecase;
const getAdvisorProfileUsecase = (advisorRepository) => {
    return (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const advisor = yield advisorRepository.findAdvisorById(userId);
        return advisor;
    });
};
exports.getAdvisorProfileUsecase = getAdvisorProfileUsecase;
