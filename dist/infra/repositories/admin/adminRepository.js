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
const admin_1 = require("../../database/model/admin/admin");
const AdminRepositoryImpl = (AdminModel) => {
    const createAdmin = (adminData) => __awaiter(void 0, void 0, void 0, function* () {
        const newAdmin = yield admin_1.adminModel.create(adminData);
        return newAdmin;
    });
    const setAdminPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(password + "arshad");
        console.log(email);
        const admin = yield admin_1.adminModel.updateOne({ email: email }, { $set: { password: password } });
        console.log(admin);
        return admin;
    });
    const findAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield admin_1.adminModel.findById({ id });
        return admin;
    });
    const findAdminByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield admin_1.adminModel.findOne({ email });
        return admin;
    });
    return { setAdminPassword, findAdminById, createAdmin, findAdminByEmail };
};
exports.default = AdminRepositoryImpl;
