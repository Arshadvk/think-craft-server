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
exports.getOneTaskController = exports.getAllTaskController = exports.findTaskByDomainController = void 0;
const task_js_1 = require("../../../infra/database/model/task/task.js");
const student_js_1 = require("../../../infra/database/model/student/student.js");
const studentRepository_js_1 = __importDefault(require("../../../infra/repositories/student/studentRepository.js"));
const taskRepository_js_1 = __importDefault(require("../../../infra/repositories/task/taskRepository.js"));
const taskMangmentUsecase_js_1 = require("../../../app/usecase/admin/task/taskMangmentUsecase.js");
const taskRepository = (0, taskRepository_js_1.default)(task_js_1.taskModel);
const studentRepository = (0, studentRepository_js_1.default)(student_js_1.studentModel);
const findTaskByDomainController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.student) === null || _b === void 0 ? void 0 : _b._id;
        const task = yield (0, taskMangmentUsecase_js_1.findTaskByDomainUsecase)(taskRepository, studentRepository)(userId);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.findTaskByDomainController = findTaskByDomainController;
const getAllTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filterData = {};
        if (req.query.week)
            filterData.week = { 'task.week': req.query.week };
        if (req.query.domain)
            filterData.domain = req.query.domain;
        if (req.query.id)
            filterData.task = req.query.id;
        const task = yield (0, taskMangmentUsecase_js_1.findAllTaskUsecase)(taskRepository)(filterData);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getAllTaskController = getAllTaskController;
const getOneTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const task = yield (0, taskMangmentUsecase_js_1.getOneTaskUseCase)(taskRepository)(id);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getOneTaskController = getOneTaskController;
