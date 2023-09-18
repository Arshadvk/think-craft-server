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
exports.reviewerAuthToken = exports.advisorAuthToken = exports.adminAuthToken = exports.StudentAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const StudentAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
        }
        jsonwebtoken_1.default.verify(authHeader, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'not hello !', Auth: false });
            }
            else if (user) {
                if (user.role === 'student' && user.student.isBlocked !== true) {
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'this token not for student !', Auth: false });
                }
            }
            next();
        });
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.StudentAuthToken = StudentAuthToken;
const adminAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
        }
        jsonwebtoken_1.default.verify(authHeader, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
            }
            else if (user) {
                if (user.role === 'admin') {
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'this token not for admin !', Auth: false });
                }
            }
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.adminAuthToken = adminAuthToken;
const advisorAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
        }
        jsonwebtoken_1.default.verify(authHeader, secretKey, (err, user) => {
            var _a;
            if (err) {
                return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
            }
            else if (user) {
                if (user.role === 'advisor' && ((_a = user.advisor) === null || _a === void 0 ? void 0 : _a.isBlocked) !== true) {
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'this token not for advisor !', Auth: false });
                }
            }
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
});
exports.advisorAuthToken = advisorAuthToken;
const reviewerAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
        }
        jsonwebtoken_1.default.verify(authHeader, secretKey, (err, user) => {
            var _a;
            if (err) {
                return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
            }
            else if (user) {
                if (user.role === 'reviewer' && ((_a = user.reviewer) === null || _a === void 0 ? void 0 : _a.isBlocked) !== true) {
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'this token not for reviewer !', Auth: false });
                }
            }
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
});
exports.reviewerAuthToken = reviewerAuthToken;
