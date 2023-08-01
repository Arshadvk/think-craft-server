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
exports.getAllAdvisorSearchFilterSortController = exports.passwordCreationAdvisor = exports.createAdvisorController = void 0;
const createAdvisor_1 = require("../../../app/usecase/admin/advisor/createAdvisor");
const setPassword_1 = require("../../../app/usecase/advisor/setPassword");
const advisor_1 = require("../../../infra/database/model/advisor/advisor");
const advisorRepository_1 = __importDefault(require("../../../infra/repositories/advisor/advisorRepository"));
const advisorRepository = (0, advisorRepository_1.default)(advisor_1.advisorModel);
const createAdvisorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advisorData = req.body;
        console.log(req.body);
        const newAdvisor = yield (0, createAdvisor_1.createAdvisorUsecase)(advisorRepository)(advisorData);
        res.status(200).send({ message: "advisor created succussfully" });
    }
    catch (error) {
    }
});
exports.createAdvisorController = createAdvisorController;
const passwordCreationAdvisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advisorData = req.body;
        const newPassword = yield (0, setPassword_1.setPasswordUsecaseAdvisor)(advisorRepository)(advisorData);
        res.status(200).send({ message: "password change successfully" });
    }
    catch (error) {
    }
});
exports.passwordCreationAdvisor = passwordCreationAdvisor;
const getAllAdvisorSearchFilterSortController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advisorList = yield (0, createAdvisor_1.getAllAdvisorUsecase)(advisorRepository)();
        res.status(200).json(advisorList);
    }
    catch (error) {
    }
});
exports.getAllAdvisorSearchFilterSortController = getAllAdvisorSearchFilterSortController;
