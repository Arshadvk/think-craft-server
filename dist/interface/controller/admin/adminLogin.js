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
exports.createAdminController = exports.passwordChangeController = exports.adminLogin = void 0;
const admin_1 = require("../../../infra/database/model/admin/admin");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const adminLogin_1 = require("../../../app/usecase/admin/adminLogin");
const adminRepository = (0, adminRepository_1.default)(admin_1.adminModel);
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.body;
        const adminToken = yield (0, adminLogin_1.loginAdmin)(adminRepository)(admin);
        res.status(200).json({ message: adminToken });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ error: error });
    }
});
exports.adminLogin = adminLogin;
const passwordChangeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminData = req.body;
        console.log(adminData);
        const newPassword = yield (0, adminLogin_1.changePasswordUsecase)(adminRepository)(adminData);
        res.status(200).send({ message: "password change successfully" });
    }
    catch (error) {
    }
});
exports.passwordChangeController = passwordChangeController;
const createAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminData = req.body;
        const newAdmin = yield (0, adminLogin_1.createAdminUsecase)(adminRepository)(adminData);
        console.log(newAdmin);
        res.status(200).send({ message: "admin Created Successfully" });
    }
    catch (error) {
    }
});
exports.createAdminController = createAdminController;
