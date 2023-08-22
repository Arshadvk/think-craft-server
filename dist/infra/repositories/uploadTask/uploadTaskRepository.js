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
const uploadTaskRepositoryIMPL = (UploadTaskModel) => {
    const uploadNewTask = (studentId, task) => __awaiter(void 0, void 0, void 0, function* () {
        const isTaskExist = yield UploadTaskModel.findOne({ student: studentId });
        if (!isTaskExist) {
            const newStudent = new UploadTaskModel({
                student: studentId,
                uploads: task
            });
            const createdTask = yield newStudent.save();
            return createdTask;
        }
        isTaskExist.uploads.push(task);
        yield isTaskExist.save();
        return isTaskExist;
    });
    return { uploadNewTask };
};
exports.default = uploadTaskRepositoryIMPL;
