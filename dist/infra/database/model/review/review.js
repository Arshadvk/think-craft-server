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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const reviewSchema = new mongoose_1.Schema({
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "student" },
    date: {
        type: String,
        default: (0, moment_1.default)().add(8, 'days').toDate()
    },
    week: {
        type: Number,
        default: 0, // Default value for 'week' field
    },
    reviewer: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'reviewer'
    },
    advisor: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "advisor"
    },
    time: String,
    day: String,
    mark: {
        type: {
            code: {
                type: Number,
                default: 0,
            },
            theory: {
                type: Number,
                default: 0,
            },
            weekStatus: {
                type: String,
                default: '______'
            }
        },
    },
    pendingTask: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: "not-scheduled"
    },
    uploadTask: {
        type: {
            personalDevelopmentWorkout: {
                type: String
            },
            technicalWorkouts: {
                type: String
            },
            miscellaneousWorkouts: {
                type: String
            },
        },
    },
    taskStatus: {
        type: {
            seminar: {
                type: String,
                default: 'Not added'
            },
            progress: {
                type: String,
                default: 'Not added'
            },
            typing: {
                type: String,
                default: 'Not added'
            }
        },
    },
}, {
    timestamps: { createdAt: true }
});
exports.reviewModel = mongoose_1.default.connection.model('review', reviewSchema);
