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
exports.blockStudentController = exports.getAllStudentSearchFilterSortController = exports.passwordCreation = exports.createStudentController = void 0;
const error_1 = require("../../../utils/error");
const student_1 = require("../../../infra/database/model/student/student");
const setPassword_1 = require("../../../app/usecase/student/setPassword");
const block_unblock_1 = require("../../../app/usecase/admin/student/block-unblock");
const createStudent_1 = require("../../../app/usecase/admin/student/createStudent");
const getAllStudent_1 = require("../../../app/usecase/admin/student/getAllStudent");
const studentRepository_1 = __importDefault(require("../../../infra/repositories/student/studentRepository"));
const studentRepository = (0, studentRepository_1.default)(student_1.studentModel);
const createStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = req.body;
        const newStudent = yield (0, createStudent_1.createStudentUsecase)(studentRepository)(studentData);
        res.status(200).send({ message: "Student Created Successfully" });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.createStudentController = createStudentController;
const passwordCreation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.student) === null || _b === void 0 ? void 0 : _b._id;
        const studentData = req.body;
        const newPassword = yield (0, setPassword_1.setPasswordUsecase)(studentRepository)(studentData, userId);
        res.status(200).send({ message: "password change successfully" });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.passwordCreation = passwordCreation;
const getAllStudentSearchFilterSortController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filterData = {};
        if (req.query.search) {
            filterData.search = {
                $or: [{ email: { $regex: req.query.search, $options: 'i' } },
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { week: { $eq: req.query.search } }
                ]
            };
        }
        if (req.query.domain)
            filterData.domain = req.query.domain;
        const studentList = yield (0, getAllStudent_1.getAllStudentUseCase)(studentRepository)(filterData);
        res.status(200).json(studentList);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getAllStudentSearchFilterSortController = getAllStudentSearchFilterSortController;
const blockStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        const action = req.body.action;
        if (!userId || !action)
            throw new error_1.AppError("Not found", 404);
        const blocked = yield (0, block_unblock_1.blockStudentUseCase)(studentRepository)(userId, action);
        if (blocked === null)
            throw new error_1.AppError("somthing went wrong while fetch the users", 500);
        if (blocked === true) {
            res.status(200).json({ message: 'User blocked succesfully' });
            return;
        }
        else if (blocked === false) {
            res.status(200).json({ message: 'User unblocked succesfully' });
            return;
        }
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.blockStudentController = blockStudentController;
