"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDomainData = void 0;
const error_js_1 = require("../../../utils/error.js");
const validateDomainData = (domainName) => {
    if (!domainName)
        throw new error_js_1.AppError("Domain name is requred", 400);
    return domainName;
};
exports.validateDomainData = validateDomainData;
