import express from "express";
const Authrouter = express.Router();
const Authcontroller = require("../Controller/authController")

Authrouter.post('/Signup', Authcontroller.SignUpAdmin);
Authrouter.post('/Login', Authcontroller.LoginAdmin);


module.exports = Authrouter;