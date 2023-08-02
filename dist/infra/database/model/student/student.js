"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const studentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, },
    password: { type: String, },
    image: { type: String, },
    fatherName: { type: String, },
    motherName: { type: String, },
    fatherNumber: { type: String, },
    motherNumber: { type: String, },
    guardianName: { type: String, },
    guardianNumber: { type: String, },
    dob: { type: Date },
    address: { type: String, },
    sex: { type: String, enum: ['male', 'female'] },
    isMailVarified: { type: Boolean, default: false },
    isBlocked: { type: Boolean }
}, {
    timestamps: { createdAt: true }
});
exports.studentModel = mongoose_1.default.connection.model('student', studentSchema);