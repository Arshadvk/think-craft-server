"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentManagement_1 = require("../controller/student/studentManagement");
const studentLoginController_1 = require("../controller/student/studentLoginController");
const studentProfileController_1 = require("../controller/student/studentProfileController");
const domainController_1 = require("../controller/admin/domain/domainController");
const studentRoute = express_1.default.Router();
studentRoute.post('/login', studentLoginController_1.studentLogin);
studentRoute.put('/setpassword/:id', studentManagement_1.passwordCreation);
studentRoute.put('/edit-profile/:id', studentProfileController_1.studentProfileController);
studentRoute.get('/profile/:id', studentProfileController_1.getStudentProfileController);
studentRoute.get('/get-domaim-info', domainController_1.getAllDomainController);
exports.default = studentRoute;
