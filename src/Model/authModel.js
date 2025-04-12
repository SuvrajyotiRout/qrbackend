"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RegisterSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    resetPasswordOTP: {
        type: String
    },
    otpExpires: {
        type: Date
    }
});
const Registreruser = mongoose_1.default.model('Registreruser', RegisterSchema);
module.exports = Registreruser;
