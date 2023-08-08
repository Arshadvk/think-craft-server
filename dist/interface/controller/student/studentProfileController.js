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
exports.getStudentProfileController = exports.studentProfileController = void 0;
const studentProfile_1 = require("../../../app/usecase/student/studentProfile");
const student_1 = require("../../../infra/database/model/student/student");
const studentRepository_1 = __importDefault(require("../../../infra/repositories/student/studentRepository"));
const studentRepository = (0, studentRepository_1.default)(student_1.studentModel);
const studentProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        console.log(userId);
        const data = req.body.values;
        const studentData = {
            name: data.name,
            number: data.number,
            address: data.address,
            fatherName: data.fatherName,
            motherName: data.motherName,
            fatherNumber: data.fatherNumber,
            motherNumber: data.motherNumber,
            guardianName: data.guardianName,
            guardianNumber: data.guardianNumber,
            gender: data.gender,
            qualification: data.qualification,
            dob: data.dob
        };
        console.log(req.body);
        console.log(studentData);
        const student = yield (0, studentProfile_1.studentProfileUsecase)(studentRepository)(userId, studentData);
        console.log(student);
        if (student)
            res.status(200).json({ message: 'update' });
        else
            res.status(200).json({ message: 'User failed' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.studentProfileController = studentProfileController;
const getStudentProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        console.log(studentId);
        const student = yield (0, studentProfile_1.getStudentProfileUsecase)(studentRepository)(studentId);
        res.status(200).json({ data: student });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getStudentProfileController = getStudentProfileController;
