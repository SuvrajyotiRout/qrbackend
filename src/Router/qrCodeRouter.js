"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer = require('multer');
const upload = multer();
const QrcodeRouter = express_1.default.Router();
const GenerateQRs = require("../Controller/generateQRcode");
const { Authentication } = require("../Middleware/AuthMiddleware");
QrcodeRouter.post("/", upload.none(), Authentication, GenerateQRs.GenerateQR);
QrcodeRouter.get("/get-menu", GenerateQRs.GetMenuByEmail);
// QrcodeRouter.get("/get-url", GenerateQRs.redirectitwebsite);
module.exports = QrcodeRouter;
