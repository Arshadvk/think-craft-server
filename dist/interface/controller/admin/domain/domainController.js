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
exports.getAllDomainController = exports.addDomainController = void 0;
const domain_1 = require("../../../../infra/database/model/domain/domain");
const addDomain_1 = require("../../../../app/usecase/admin/domain/addDomain");
const domainRepository_1 = __importDefault(require("../../../../infra/repositories/domain/domainRepository"));
const getDomainUsecase_1 = require("../../../../app/usecase/admin/domain/getDomainUsecase");
const domainRepository = (0, domainRepository_1.default)(domain_1.domainModel);
const addDomainController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body;
        console.log(name);
        const newDomain = yield (0, addDomain_1.addDomainUseCase)(domainRepository)(name);
        if (!newDomain)
            res.status(500).json({ message: 'Somthing went wrong' });
        else
            res.status(200).json({ message: 'domain added succesfully' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Somthing went wrong' });
    }
});
exports.addDomainController = addDomainController;
const getAllDomainController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const domains = yield (0, getDomainUsecase_1.getAllDomainUsecase)(domainRepository)();
        if (!domains)
            res.status(500).json({ message: "no domain found" });
        else
            res.status(200).json(domains);
    }
    catch (error) {
    }
});
exports.getAllDomainController = getAllDomainController;
