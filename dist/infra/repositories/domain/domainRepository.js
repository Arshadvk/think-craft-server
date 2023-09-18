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
const domain_1 = require("../../database/model/domain/domain");
const domainRepositoryIMPL = (DomainModel) => {
    const createNewDomain = (name) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("mgjfsngj");
        const newDomain = yield domain_1.domainModel.create(name);
        console.log(newDomain);
        return newDomain;
    });
    const findDomainByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
        const domainExist = yield domain_1.domainModel.findOne();
        return domainExist;
    });
    const findAllDomain = () => __awaiter(void 0, void 0, void 0, function* () {
        const domain = yield domain_1.domainModel.find();
        return domain;
    });
    return { createNewDomain, findDomainByName, findAllDomain };
};
exports.default = domainRepositoryIMPL;
