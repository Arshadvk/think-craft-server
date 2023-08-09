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
exports.getAdvisorProfileController = exports.advisorProfileController = void 0;
const advisorProfile_1 = require("../../../app/usecase/advisor/advisorProfile");
const advisorRepository_1 = __importDefault(require("../../../infra/repositories/advisor/advisorRepository"));
const advisor_1 = require("../../../infra/database/model/advisor/advisor");
const advisorRepository = (0, advisorRepository_1.default)(advisor_1.advisorModel);
const advisorProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        console.log(userId);
        const data = req.body.values;
        console.log(data);
        const advisorData = {
            number: data.number,
            address: data.address,
            dob: data.dob,
            gender: data.gender,
            qualification: data.education,
            domain: data.domain
        };
        const advisor = yield (0, advisorProfile_1.advisorProfileUsecase)(advisorRepository)(userId, advisorData);
        console.log(advisor);
        if (advisor)
            res.status(200).json(advisor);
        else
            res.status(200).json({ message: 'User failed' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.advisorProfileController = advisorProfileController;
const getAdvisorProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const advisor = yield (0, advisorProfile_1.getAdvisorProfileUsecase)(advisorRepository)(userId);
        res.status(200).json({ data: advisor });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.getAdvisorProfileController = getAdvisorProfileController;
