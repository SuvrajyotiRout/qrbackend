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
const Registreruser = require('../Model/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SignUpAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        console.log("DATA" + req.body.email);
        const isemailexist = yield Registreruser.findOne({ email });
        if (isemailexist) {
            return res.status(400).json({ message: "This email is Already exists" });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield Registreruser({ username, email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: 'user registered successfully', newuser: newUser, success: true });
    }
    catch (error) {
        res.status(500).json({ message: 'Something Went Wrong', success: false, error: error });
    }
});
const LoginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isuserexist = yield Registreruser.findOne({ email });
        if (!isuserexist) {
            return res.status(404).json({ message: "Uaer not found" });
        }
        const isposswordmatch = yield bcrypt.compare(password, isuserexist.password);
        if (!isposswordmatch) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }
        const token = jwt.sign({ id: isuserexist._id }, "SECRET_KEY", { expiresIn: "1h" });
        res.status(200).json({ message: 'user Login successfully', TOKEN: token, success: true });
    }
    catch (error) {
        res.status(500).json({ message: 'Something Went Wrong', success: false, error: error });
    }
});
const ForgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const ResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
module.exports = {
    SignUpAdmin,
    LoginAdmin,
    ForgetPassword,
    ResetPassword
};
