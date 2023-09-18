"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = require("../middlewares/authMiddleware.js");
const taskManagment_js_1 = require("../controller/admin/task/taskManagment.js");
const taskManagementController_js_1 = require("../controller/task/taskManagementController.js");
const domainController_js_1 = require("../controller/admin/domain/domainController.js");
const adminLogin_js_1 = require("../controller/admin/adminLogin.js");
const advisorMangment_js_1 = require("../controller/advisor/advisorMangment.js");
const studentManagement_js_1 = require("../controller/student/studentManagement.js");
const reviewerManagment_js_1 = require("../controller/reviewer/reviewerManagment.js");
const adminRoute = express_1.default.Router();
adminRoute.post('/login', adminLogin_js_1.adminLogin);
adminRoute.post('/add-student', authMiddleware_js_1.adminAuthToken, studentManagement_js_1.createStudentController);
adminRoute.post('/add-reviewer', authMiddleware_js_1.adminAuthToken, reviewerManagment_js_1.createReviewerController);
adminRoute.post('/add-advisor', authMiddleware_js_1.adminAuthToken, advisorMangment_js_1.createAdvisorController);
adminRoute.get('/all-student', authMiddleware_js_1.adminAuthToken, studentManagement_js_1.getAllStudentSearchFilterSortController);
adminRoute.get('/all-reviewer', authMiddleware_js_1.adminAuthToken, reviewerManagment_js_1.getAllReviewerSearchFilterSortController);
adminRoute.get('/all-advisor', authMiddleware_js_1.adminAuthToken, advisorMangment_js_1.getAllAdvisorSearchFilterSortController);
adminRoute.patch('/block-unblock-student', authMiddleware_js_1.adminAuthToken, studentManagement_js_1.blockStudentController);
adminRoute.patch('/block-unblock-reviewer', authMiddleware_js_1.adminAuthToken, reviewerManagment_js_1.blockReviewerController);
adminRoute.patch('/block-unblock-advisor', authMiddleware_js_1.adminAuthToken, advisorMangment_js_1.blockAdvisorController);
adminRoute.post('/add-domain', authMiddleware_js_1.adminAuthToken, domainController_js_1.addDomainController);
adminRoute.get('/all-domain', authMiddleware_js_1.adminAuthToken, domainController_js_1.getAllDomainController);
adminRoute.put('/change-password', adminLogin_js_1.passwordChangeController);
adminRoute.post('/add-admin', authMiddleware_js_1.adminAuthToken, adminLogin_js_1.createAdminController);
adminRoute.post('/add-task', authMiddleware_js_1.adminAuthToken, taskManagment_js_1.addTaskController);
adminRoute.put('/edit-task', authMiddleware_js_1.adminAuthToken, taskManagment_js_1.editOneTaskController);
adminRoute.get('/all-task', authMiddleware_js_1.adminAuthToken, taskManagementController_js_1.getAllTaskController);
adminRoute.get('/task', authMiddleware_js_1.adminAuthToken, taskManagementController_js_1.getOneTaskController);
exports.default = adminRoute;
