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
    const createNewDomain = (domainName) => __awaiter(void 0, void 0, void 0, function* () {
        const newDomain = new DomainModel({
            name: domainName,
        });
        const createdDomain = yield newDomain.save();
        return createdDomain;
    });
    const findDomainByName = (domainName) => __awaiter(void 0, void 0, void 0, function* () {
        const domainExist = yield domain_1.domainModel.find({ domainName });
        return domainExist;
    });
    return { createNewDomain, findDomainByName };
};
exports.default = domainRepositoryIMPL;
