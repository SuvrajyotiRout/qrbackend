import express from "express";

const multer = require('multer');
const upload = multer();

const QrcodeRouter = express.Router();
const GenerateQRs = require("../Controller/generateQRcode")
const { Authentication } = require("../Middleware/AuthMiddleware")


QrcodeRouter.post("/", upload.none(), Authentication, GenerateQRs.GenerateQR)
QrcodeRouter.get("/get-menu", GenerateQRs.GetMenuByEmail);
// QrcodeRouter.get("/get-url", GenerateQRs.redirectitwebsite);



module.exports = QrcodeRouter;