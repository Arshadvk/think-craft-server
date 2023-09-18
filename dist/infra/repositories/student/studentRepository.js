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
    const setStudentPassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield student_1.studentModel.findByIdAndUpdate({ _id: id }, { $set: { password: password } });
        return student;
    });
    const getAllStudents = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        if (filterData.search) {
            const allStudent = yield StudentModel.find(filterData.search).populate('domain');
            return allStudent;
        }
        else {
            const allStudent = yield StudentModel.find(filterData).populate('domain');
            return allStudent;
        }
    });
    const updateIsBlock = (userId, action) => __awaiter(void 0, void 0, void 0, function* () {
        let isBlocked;
        if (action === "block")
            isBlocked = true;
        if (action === "unblock")
            isBlocked = false;
        const student = yield student_1.studentModel.findByIdAndUpdate(userId, { isBlocked }, { new: true });
        if (!student)
            throw new error_1.AppError('somthing went wrong when block the user ', 500);
        return isBlocked;
    });
    const updateStudentProfile = (userId, studentData) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield student_1.studentModel.findByIdAndUpdate(userId, studentData, { new: true });
        if (!student)
            throw new error_1.AppError('somthing went wrong when block the user ', 500);
        return student;
    });
    const findStudentById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield student_1.studentModel.findById(userId).populate('domain');
        return student;
    });
    const findStudentIsBlocked = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield student_1.studentModel.findById(userId, { isBlocked: 1 });
        if (student === null || student === void 0 ? void 0 : student.isBlocked) {
            return true;
        }
        return false;
    });
    const updateStudentWeek = (userId, week) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield student_1.studentModel.findByIdAndUpdate(userId, { week: week }, { new: true });
        return student;
    });
    return {
        createStudent,
        findStudentByEmail,
        setStudentPassword,
        getAllStudents,
        updateIsBlock,
        updateStudentProfile,
        findStudentById,
        findStudentIsBlocked,
        updateStudentWeek
    };
};
exports.default = studentRepositoryImpl;
