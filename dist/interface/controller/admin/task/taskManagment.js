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
exports.addTaskController = void 0;
const task_1 = require("../../../../infra/database/model/task/task");
const taskRepository_1 = __importDefault(require("../../../../infra/repositories/admin/task/taskRepository"));
const taskMangmentUsecase_1 = require("../../../../app/usecase/admin/task/taskMangmentUsecase");
const taskRepository = (0, taskRepository_1.default)(task_1.taskModel);
const addTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = req.body;
        const newTask = yield (0, taskMangmentUsecase_1.addTaskUsecase)(taskRepository)(task);
        if (!newTask)
            res.status(500).json({ message: "Somthing went worng" });
        else
            res.status(200).json({ message: "task add succesfully" });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.addTaskController = addTaskController;
