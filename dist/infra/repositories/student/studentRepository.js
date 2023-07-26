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
const student_1 = require("../../database/model/student/student");
const studentRepositoryImpl = (StudentModel) => {
    const createStudent = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
        const newStudent = yield student_1.studentModel.create(studentData);
        return newStudent;
    });
    const findStudentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield student_1.studentModel.findOne({ email });
        return student;
    });
    const setStudentPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield student_1.studentModel.updateOne({ email: email }, { $set: { password: password } });
        return student;
    });
    return { createStudent, findStudentByEmail, setStudentPassword };
};
exports.default = studentRepositoryImpl;
