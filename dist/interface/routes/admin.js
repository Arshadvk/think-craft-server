"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminLogin_1 = require("../controller/admin/adminLogin");
const studentManagement_1 = require("../controller/student/studentManagement");
const adminRoute = express_1.default.Router();
adminRoute.post('/login', adminLogin_1.adminLogin);
adminRoute.post('/add-student', studentManagement_1.createStudentController);
exports.default = adminRoute;
