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
exports.addDomainUseCase = void 0;
const domain_1 = require("../../../../domain/entities/admin/domain");
const addDomainUseCase = (domainRepository) => {
    return (domainName) => __awaiter(void 0, void 0, void 0, function* () {
        const domainNameValidate = (0, domain_1.validateDomainData)(domainName);
        const newDomain = yield domainRepository.createNewDomain(domainNameValidate);
        return newDomain;
    });
};
exports.addDomainUseCase = addDomainUseCase;
