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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudentSearchFilterSortController = exports.passwordCreation = exports.createStudentController = void 0;
const studentRepository_1 = __importDefault(require("../../../infra/repositories/student/studentRepository"));
const student_1 = require("../../../infra/database/model/student/student");
const setPassword_1 = require("../../../app/usecase/student/setPassword");
const createStudent_1 = require("../../../app/usecase/admin/student/createStudent");
const studentRepository = (0, studentRepository_1.default)(student_1.studentModel);
const createStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = req.body;
        console.log(studentData);
        const newStudent = yield (0, createStudent_1.createStudentUsecase)(studentRepository)(studentData);
        console.log(newStudent);
        res.status(200).send({ message: "Student Created Successfully" });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.createStudentController = createStudentController;
const passwordCreation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = req.body;
        const newPassword = yield (0, setPassword_1.setPasswordUsecase)(studentRepository)(studentData);
        res.status(200).send({ message: "password change successfully" });
    }
    catch (error) {
    }
});
exports.passwordCreation = passwordCreation;
const getAllStudentSearchFilterSortController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentList = yield (0, createStudent_1.getAllStudentUseCase)(studentRepository)();
        res.status(200).json(studentList);
    }
    catch (error) {
    }
});
exports.getAllStudentSearchFilterSortController = getAllStudentSearchFilterSortController;
