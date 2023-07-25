"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminLogin_1 = require("../controller/admin/adminLogin");
const adminRoute = express_1.default.Router();
adminRoute.post('/login', adminLogin_1.adminLogin);
exports.default = adminRoute;
