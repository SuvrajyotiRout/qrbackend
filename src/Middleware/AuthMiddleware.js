"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authentication = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: "Please Login to Access...", });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, "SECRET_KEY");
        console.log("Decoded Token:", decode);
        req.admin = decode;
        next();
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};
module.exports = { Authentication };
