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
const task_1 = require("../../database/model/task/task");
const taskRepositoryIMPL = (TaskModel) => {
    const createNewTask = (domainId, tasks) => __awaiter(void 0, void 0, void 0, function* () {
        const isDomainExist = yield TaskModel.findOne({ domain: domainId });
        if (!isDomainExist) {
            const newTask = new TaskModel({
                domain: domainId,
                tasks: tasks
            });
            const createdTask = yield newTask.save();
            return createdTask;
        }
        isDomainExist.tasks.push(tasks);
        yield isDomainExist.save();
        return isDomainExist;
    });
    const findWeeklyTask = (domainId, week) => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield TaskModel.findOne({
            domain: domainId,
            'tasks.week': week
        }, {
            'tasks.$': 1
        });
        return task;
    });
    const findAllTask = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
        const query = {};
        if (filterData.week) {
            query['tasks.week'] = filterData.week;
        }
        if (filterData.domain) {
            query.domain = filterData.domain;
        }
        if (filterData.task) {
            query['tasks'] = {
                $elemMatch: {
                    _id: filterData.task,
                },
            };
        }
        const tasks = task_1.taskModel.find(query).populate('domain');
        return tasks;
    });
    const findOneTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const task = task_1.taskModel.find({
            "tasks": {
                $elemMatch: { "_id": id }
            }
        }, {
            'tasks.$': 1
        });
        return task;
    });
    const findOneTaskAndUpdate = (taskId, UpdatedData) => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            "tasks": {
                $elemMatch: {
                    "_id": taskId
                }
            }
        };
        const result = yield task_1.taskModel.findOneAndUpdate(query, { $set: { "tasks.$": UpdatedData } }, { new: true });
        return result;
    });
    return { createNewTask, findWeeklyTask, findAllTask, findOneTask, findOneTaskAndUpdate };
};
exports.default = taskRepositoryIMPL;
