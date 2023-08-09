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
exports.advisorLogin = void 0;
const advisorLogin_1 = require("../../../app/usecase/advisor/advisorLogin");
const advisor_1 = require("../../../infra/database/model/advisor/advisor");
const advisorRepository_1 = __importDefault(require("../../../infra/repositories/advisor/advisorRepository"));
const advisorRepository = (0, advisorRepository_1.default)(advisor_1.advisorModel);
const advisorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advisor = req.body;
        const advisorToken = yield (0, advisorLogin_1.loginAdvisor)(advisorRepository)(advisor);
        console.log(advisorToken);
        res.status(200).json({ token: advisorToken });
    }
    catch (error) {
    }
});
exports.advisorLogin = advisorLogin;
