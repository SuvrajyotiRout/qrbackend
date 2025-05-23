"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authrouter = express_1.default.Router();
const Authcontroller = require("../Controller/authController");
Authrouter.post('/Signup', Authcontroller.SignUpAdmin);
Authrouter.post('/Login', Authcontroller.LoginAdmin);
module.exports = Authrouter;
