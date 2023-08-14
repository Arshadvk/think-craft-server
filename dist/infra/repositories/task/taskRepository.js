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
    return { createNewTask };
};
exports.default = taskRepositoryIMPL;
