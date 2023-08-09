"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const advisorMangment_1 = require("../controller/advisor/advisorMangment");
const advisorLoginController_1 = require("../controller/advisor/advisorLoginController");
const advisorProfileManagment_1 = require("../controller/advisor/advisorProfileManagment");
const advisorRoute = express_1.default.Router();
advisorRoute.post('/login', advisorLoginController_1.advisorLogin);
advisorRoute.put('/setpassword', advisorMangment_1.passwordCreationAdvisor);
advisorRoute.put('/edit-profile/:id', advisorProfileManagment_1.advisorProfileController);
advisorRoute.get('/profile/:id', advisorProfileManagment_1.getAdvisorProfileController);
exports.default = advisorRoute;
