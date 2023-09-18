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
exports.fileUpload = void 0;
const cloudinary_1 = __importDefault(require("../../../../domain/service/cloudinary"));
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const file = req.body.file;
        if (file) {
            const uploadRes = yield cloudinary_1.default.uploader.upload(file, {
                upload_preset: "samples"
            });
            if (uploadRes) {
                res.status(200).json({ message: "success full" });
            }
        }
        res.status(404).json({ message: "errror " });
    }
    catch (error) {
    }
});
exports.fileUpload = fileUpload;
