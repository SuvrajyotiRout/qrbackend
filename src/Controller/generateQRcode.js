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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_1 = __importDefault(require("qrcode"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const NonVeg = require('../Model/NonVegModel');
const Veg = require('../Model/vegModel');
const Registreruser = require("../Model/authModel");
const DrinksModel = require("../Model/DrinksModel");
// Ensure the "public" directory exists
const publicDir = path_1.default.join(__dirname, "../../", "public");
if (!fs_1.default.existsSync(publicDir)) {
    fs_1.default.mkdirSync(publicDir, { recursive: true });
    console.log(`✅ "public" folder created at: ${publicDir}`);
}
const GenerateQR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request Body:", req.body);
    try {
        const email = req.body.email;
        console.log("Received email:", email);
        const isemailexist = yield Registreruser.findOne({ email });
        if (!isemailexist) {
            return res.status(400).json({ message: "Email not Found in the database" });
        }
        if (!email || email === "undefined") {
            return res.status(400).json({ error: "Email parameter is missing or invalid" });
        }
        // don't show the link url when the qr is scanned the then direct redirect to the "qrData" page 
        // const qrData: string = `http://localhost:5000/get-menu/${encodeURIComponent(email)}`;
        // const qrData: string = `http://localhost:5000/generate-qr/get-menu`;
        const qrData = `https://suvrajyotirout.netlify.app/`;
        // const qrData: string = `http://localhost:5000/generate-qr/get-url`;
        // const qrFilePath = path.join(__dirname, "public", `${email}.png`);
        const qrFilePath = path_1.default.join(publicDir, `${email}.png`);
        const qrFileUrl = `https://qrbackend-5.onrender.com/${email}.png`;
        if (fs_1.default.existsSync(qrFilePath)) {
            console.log("QR already exists, sending existing file.");
            return res.json({ qrCodeUrl: qrFileUrl, email: email, success: true });
        }
        yield qrcode_1.default.toFile(qrFilePath, qrData);
        res.json({ qrCodeUrl: `https://qrbackend-5.onrender.com/${email}.png`, email: email, success: true });
    }
    catch (error) {
        console.error("QR Code generation error:", error.message, error.stack);
        res.status(500).json({ error: "Failed to generate QR code", success: false });
    }
});
const GetMenuByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nonVegMenu = yield NonVeg.find();
        const vegMenu = yield Veg.find();
        const Drinkingitem = yield DrinksModel.find();
        console.log(vegMenu, nonVegMenu, Drinkingitem);
        if (!nonVegMenu.length && !vegMenu.length) {
            return res.status(404).json({ message: "No menu found for this email", success: false });
        }
        res.status(200).json({
            message: "Menu retrieved successfully",
            success: true,
            // email, // Send email back for further use
            menu: { vegMenu, nonVegMenu, drinksMenu: Drinkingitem }
        });
    }
    catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).json({ message: "Something went wrong", error, success: false });
    }
});
// const redirectitwebsite = async (req: any, res: any) => {
//     const email = req.params.email;
//     res.redirect(`https://suvrajyotirout.netlify.app`);
// }
module.exports = { GenerateQR, GetMenuByEmail };
