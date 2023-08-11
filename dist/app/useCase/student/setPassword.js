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
exports.setPasswordUsecase = void 0;
const hashing_1 = require("../../../domain/service/hashing");
const setPasswordUsecase = (studentRepository) => {
    return (studentData, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const password = yield (0, hashing_1.passwordHashing)(studentData.password);
        const student = yield studentRepository.setStudentPassword(userId, password);
        return student;
    });
};
exports.setPasswordUsecase = setPasswordUsecase;
