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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.createAdminUsecase = exports.changePasswordUsecase = void 0;
const error_1 = require("../../../utils/error");
const hashing_1 = require("../../../domain/service/hashing");
const admin_1 = require("../../../domain/entities/admin/admin");
const changePasswordUsecase = (adminRepository) => {
    return (adminData) => __awaiter(void 0, void 0, void 0, function* () {
        const newPassword = yield (0, hashing_1.passwordHashing)(adminData.password);
        console.log(newPassword);
        const changepassword = yield adminRepository.setAdminPassword(adminData.email, newPassword);
        return changepassword;
    });
};
exports.changePasswordUsecase = changePasswordUsecase;
const createAdminUsecase = (adminRepository) => {
    return (adminData) => __awaiter(void 0, void 0, void 0, function* () {
        const newAdmin = yield adminRepository.createAdmin(adminData);
        return newAdmin;
    });
};
exports.createAdminUsecase = createAdminUsecase;
const loginAdmin = (adminRepository) => {
    return (admin) => __awaiter(void 0, void 0, void 0, function* () {
        const isAdminExist = yield adminRepository.findAdminByEmail(admin.email);
        if (!isAdminExist)
            throw new error_1.AppError("admin is not exist", 404);
        const adminToken = yield (0, admin_1.adminLoginValidate)(admin, isAdminExist);
        const verifiedAdmin = {
            token: adminToken,
            status: "Login success"
        };
        return verifiedAdmin;
    });
};
exports.loginAdmin = loginAdmin;
