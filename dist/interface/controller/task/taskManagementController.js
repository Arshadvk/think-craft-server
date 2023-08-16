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
exports.findTaskByDomainController = void 0;
const taskMangmentUsecase_1 = require("../../../app/usecase/admin/task/taskMangmentUsecase");
const taskRepository_1 = __importDefault(require("../../../infra/repositories/task/taskRepository"));
const task_1 = require("../../../infra/database/model/task/task");
const studentRepository_1 = __importDefault(require("../../../infra/repositories/student/studentRepository"));
const student_1 = require("../../../infra/database/model/student/student");
const taskRepository = (0, taskRepository_1.default)(task_1.taskModel);
const studentRepository = (0, studentRepository_1.default)(student_1.studentModel);
const findTaskByDomainController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.student) === null || _b === void 0 ? void 0 : _b._id;
        console.log(userId);
        const task = yield (0, taskMangmentUsecase_1.findTaskByDomainUsecase)(taskRepository, studentRepository)(userId);
        console.log(task);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.findTaskByDomainController = findTaskByDomainController;