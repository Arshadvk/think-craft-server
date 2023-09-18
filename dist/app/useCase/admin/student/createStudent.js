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
exports.createStudentUsecase = void 0;
const error_1 = require("../../../../utils/error");
const email_send_1 = require("../../../../domain/service/email_send");
const student_1 = require("../../../../domain/entities/student/student");
const createStudentUsecase = (studentRepository) => {
    return (studentData) => __awaiter(void 0, void 0, void 0, function* () {
        const isStudent = yield studentRepository.findStudentByEmail(studentData.email);
        if (isStudent)
            throw new error_1.AppError("Student is already exist", 409);
        const newStudent = yield studentRepository.createStudent(studentData);
        const token = (0, student_1.createToken)(newStudent);
        const sended = (0, email_send_1.sendMail)(newStudent, "", token);
        return newStudent;
    });
};
exports.createStudentUsecase = createStudentUsecase;
