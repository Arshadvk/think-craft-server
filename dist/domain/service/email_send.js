"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (userData, userType, token) => {
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
        to: userData.email,
        subject: 'Set Password & profile ',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        .text-shadow {
            text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.399);
          }
          </style>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="bg-gray-100 font-sans">
            <div class="max-w-screen-md mx-auto p-6">
                <div class="bg-blue-500 text-white text-center py-4">
                    <h1 class="text-2xl font-semibold">Welcome to Think Craft</h1>
                </div>
                <div class="bg-white p-6 border rounded mt-4">
                    <p>Dear ${userData.name},</p>
                    <p>Welcome to <b>Think Craft</b>! An administrator has created an account for you. To set up your password and access your account, please follow the link below:</p>
                    <p class="mt-4"><a href="https://think-craft.vercel.app${userType}/set-password/${token}" class="text-blue-500 text-shadow font-bold text-3xl">Complete Your Registration</a></p>
                    <p>This link is valid for a limited time and is unique to you. Please keep it confidential and do not share it with others.</p>
                    <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:egoftverify@gmail.com" class="text-blue-500">egoftverify@gmail.com</a> or 7560943415. We're here to help!</p>
                    <p>Thank you for choosing Think Craft. We look forward to serving you.</p>
                    <p>Best regards,<br>The Think Craft Team</p>
                </div>
                <div class="bg-gray-200 text-center p-4 mt-4">
                    <p>This is an automated message. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        }
        else {
            return info.response;
        }
    });
};
exports.sendMail = sendMail;
