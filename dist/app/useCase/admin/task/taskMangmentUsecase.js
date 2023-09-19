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
exports.getOneTaskAndUpdate = exports.getOneTaskUseCase = exports.findAllTaskUsecase = exports.findTaskByDomainUsecase = exports.addTaskUsecase = void 0;
const addTaskUsecase = (taskRepository) => {
    return (domainId, Tasks) => __awaiter(void 0, void 0, void 0, function* () {
        const newTask = yield taskRepository.createNewTask(domainId, Tasks);
        return newTask;
    });
};
exports.addTaskUsecase = addTaskUsecase;
const findTaskByDomainUsecase = (taskRepository, studentRepository) => {
    return (userId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const student = yield studentRepository.findStudentById(userId);
        const task = yield taskRepository.findWeeklyTask((_a = student === null || student === void 0 ? void 0 : student.domain) === null || _a === void 0 ? void 0 : _a._id, student === null || student === void 0 ? void 0 : student.week);
        return task;
    });
};
exports.findTaskByDomainUsecase = findTaskByDomainUsecase;
const findAllTaskUsecase = (taskRepository) => {
    return (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        const allTask = yield taskRepository.findAllTask(filterData);
        return allTask;
    });
};
exports.findAllTaskUsecase = findAllTaskUsecase;
const getOneTaskUseCase = (taskRepository) => {
    return (id) => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield taskRepository.findOneTask(id);
        return task;
    });
};
exports.getOneTaskUseCase = getOneTaskUseCase;
const getOneTaskAndUpdate = (taskRepository) => {
    return (id, UpdatedData) => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield taskRepository.findOneTaskAndUpdate(id, UpdatedData);
        return task;
    });
};
exports.getOneTaskAndUpdate = getOneTaskAndUpdate;
