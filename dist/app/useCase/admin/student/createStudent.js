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
exports.createStudentUsecase = void 0;
const error_1 = require("../../../../utils/error");
const nodemailer_1 = __importDefault(require("nodemailer"));
const createStudentUsecase = (studentRepository) => {
    console.log("tdfygfdc");
    return (studentData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("tdfygfdc");
        console.log(studentData);
        const isStudent = yield studentRepository.findStudentByEmail(studentData.email);
        if (isStudent)
            throw new error_1.AppError("Student is already exist", 409);
        const newStudent = yield studentRepository.createStudent(studentData);
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: studentData.email,
            subject: 'Verify Your Email',
            html: "<p></p>"
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error + 'djsd');
            }
            else {
                console.log("Email has been sent:-", info.response);
            }
        });
        return newStudent;
    });
};
exports.createStudentUsecase = createStudentUsecase;
