"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewerProfileMiddleware = exports.advisorProfileMiddleware = exports.studentProfileMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentProfileMiddleware = (req, res, next) => {
    try {
        const studentToken = req.params.id;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!studentToken || !secretKey) {
            return res.status(401).json({ success: false, message: 'no token', Auth: false });
        }
        jsonwebtoken_1.default.verify(studentToken, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'invalid token', Auth: false });
            }
            else if (user) {
                console.log(user);
                if ((user === null || user === void 0 ? void 0 : user.role) === 'student' && user.student.isProfileVerified !== true) {
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
                }
            }
            next();
        });
    }
    catch (err) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.studentProfileMiddleware = studentProfileMiddleware;
const advisorProfileMiddleware = (req, res, next) => {
    try {
        const advisorToken = req.params.id;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!advisorToken || !secretKey) {
            return res.status(401).json({ success: false, message: 'no token', Auth: false });
        }
        jsonwebtoken_1.default.verify(advisorToken, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'invalid token', Auth: false });
            }
            else if (user) {
                if ((user === null || user === void 0 ? void 0 : user.role) === 'advisor') {
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
                }
            }
            next();
        });
    }
    catch (err) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.advisorProfileMiddleware = advisorProfileMiddleware;
const reviewerProfileMiddleware = (req, res, next) => {
    try {
        const reviewerToken = req.params.id;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!reviewerToken || !secretKey) {
            return res.status(401).json({ success: false, message: 'no token', Auth: false });
        }
        jsonwebtoken_1.default.verify(reviewerToken, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'invalid token', Auth: false });
            }
            else if (user) {
                if ((user === null || user === void 0 ? void 0 : user.role) === 'reviewer') {
                    req.user = user;
                }
                else {
                    return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
                }
            }
            next();
        });
    }
    catch (err) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.reviewerProfileMiddleware = reviewerProfileMiddleware;
