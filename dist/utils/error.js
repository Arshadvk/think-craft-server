"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(mssge, statusCode) {
        super(mssge);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
