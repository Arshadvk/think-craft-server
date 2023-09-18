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
exports.studentChangePassword = exports.studentLogin = void 0;
const student_1 = require("../../../infra/database/model/student/student");
const studentRepository_1 = __importDefault(require("../../../infra/repositories/student/studentRepository"));
const studentLogin_1 = require("../../../app/usecase/student/studentLogin");
const studentRepository = (0, studentRepository_1.default)(student_1.studentModel);
const studentLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = req.body;
        const studentToken = yield (0, studentLogin_1.loginStudent)(studentRepository)(student);
        res.status(200).json({ studentToken });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.studentLogin = studentLogin;
const studentChangePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = req.user.student._id;
        const value = req.body.value;
        const updateStudent = yield (0, studentLogin_1.changeStudentPassword)(studentRepository)(student, value);
        res.status(200).json(updateStudent);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.studentChangePassword = studentChangePassword;
