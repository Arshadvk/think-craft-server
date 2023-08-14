"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uploadTaskSchema = new mongoose_1.Schema({
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "student" },
    tasks: [{
            week: {
                type: Number
            },
            personalDevelopmentWorkout: {
                type: Array
            }, technicalWorkouts: {
                type: Array
            }, miscellaneousWorkouts: {
                type: Array
            }
        }]
});
