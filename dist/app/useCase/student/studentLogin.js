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
exports.changeStudentPassword = exports.loginStudent = void 0;
const error_1 = require("../../../utils/error");
const hashing_1 = require("../../../domain/service/hashing");
const student_1 = require("../../../domain/entities/student/student");
const loginStudent = (studentRepository) => {
    return (student) => __awaiter(void 0, void 0, void 0, function* () {
        const isStudentExist = yield studentRepository.findStudentByEmail(student.email);
        if (!isStudentExist)
            throw new error_1.AppError("user is not exist", 404);
        const StudentToken = yield (0, student_1.studentLoginUserValidate)(student, isStudentExist);
        const verifiedStudent = {
            token: StudentToken,
            status: "Login success"
        };
        return verifiedStudent;
    });
};
exports.loginStudent = loginStudent;
const changeStudentPassword = (studentRepository) => {
    return (studentId, value) => __awaiter(void 0, void 0, void 0, function* () {
        const isStudentExist = yield studentRepository.findStudentById(studentId);
        if (!isStudentExist)
            throw new error_1.AppError("user is not exist", 404);
        const IsPasswordCorrect = yield (0, hashing_1.isPasswordCorrect)(value.oldpass, isStudentExist.password);
        if (!IsPasswordCorrect)
            throw new error_1.AppError("Old password is not same", 404);
        const hashedPassword = yield (0, hashing_1.passwordHashing)(value.newpass);
        const updateStudent = yield studentRepository.updateStudentProfile(studentId, { password: hashedPassword });
        return updateStudent;
    });
};
exports.changeStudentPassword = changeStudentPassword;
