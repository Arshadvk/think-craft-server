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
exports.adminLogin = void 0;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.body;
        console.log(req.body);
        if (admin.name == "maxarshu7560@gmail.com") {
            res.status(200).json({ message: "admin login successfully" });
        }
        else {
            res.status(200).json({ message: "admin login failed" });
        }
    }
    catch (error) {
    }
});
exports.adminLogin = adminLogin;
