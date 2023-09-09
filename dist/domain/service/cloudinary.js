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
exports.fileUpload = void 0;
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'sample',
    api_key: '874837483274837',
    api_secret: 'a676b67565c6767a6767d6767f676fe1',
    secure: true
});
const fileUpload = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fileUpload = fileUpload;
