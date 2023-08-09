"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const StudentAuthenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        const secretKey = process.env.JWT_SECRET_KEY_STUDENT;
        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
        }
        let token = JSON.parse(authHeader);
        console.log("uggygy");
        token = token.Token;
        console.log(token);
        jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'not hello !', Auth: false });
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
const adminAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        const secretKey = process.env.JWT_SECRET_KEY_ADMIN;
        console.log(secretKey);
        if (!authHeader || !secretKey) {
            return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
        }
        // const token:string = JSON.parse(authHeader).Token
        // console.log(typeof token, token);
        jsonwebtoken_1.default.verify(authHeader, secretKey, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
            }
            else {
                console.log(user, 99);
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.adminAuthToken = adminAuthToken;
exports.default = StudentAuthenticateToken;
