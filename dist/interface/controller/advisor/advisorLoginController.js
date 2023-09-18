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
exports.advisorChangePassword = exports.advisorLogin = void 0;
const advisor_1 = require("../../../infra/database/model/advisor/advisor");
const advisorRepository_1 = __importDefault(require("../../../infra/repositories/advisor/advisorRepository"));
const advisorLogin_1 = require("../../../app/usecase/advisor/advisorLogin");
const advisorRepository = (0, advisorRepository_1.default)(advisor_1.advisorModel);
const advisorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advisor = req.body;
        const advisorToken = yield (0, advisorLogin_1.loginAdvisor)(advisorRepository)(advisor);
        res.status(200).json({ token: advisorToken });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.advisorLogin = advisorLogin;
const advisorChangePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advisor = req.user.advisor._id;
        const value = req.body.value;
        console.log(value);
        const updateAdvisor = yield (0, advisorLogin_1.changeAdvisorPassword)(advisorRepository)(advisor, value);
        res.status(200).json(updateAdvisor);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.advisorChangePassword = advisorChangePassword;
