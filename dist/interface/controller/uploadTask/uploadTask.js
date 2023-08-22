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
exports.uploadTaskByStudentController = void 0;
const uploadTaskUseCase_1 = require("../../../app/usecase/student/uploadTask/uploadTaskUseCase");
const uploadTaskRepository_1 = __importDefault(require("../../../infra/repositories/uploadTask/uploadTaskRepository"));
const uploadTask_1 = require("../../../infra/database/model/uploadTask/uploadTask");
const uploadTaskRepository = (0, uploadTaskRepository_1.default)(uploadTask_1.uploadTaskModel);
const uploadTaskByStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.student) === null || _b === void 0 ? void 0 : _b._id;
        const upload_task = req.body;
        const uploadTask = yield (0, uploadTaskUseCase_1.uploadTaskUsecase)(uploadTaskRepository)(userId, upload_task);
        res.status(200).json(uploadTask);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.uploadTaskByStudentController = uploadTaskByStudentController;
