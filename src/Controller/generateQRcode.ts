import QRCode from "qrcode";
import path from "path";
import fs from "fs";
const NonVeg = require('../Model/NonVegModel')
const Veg = require('../Model/vegModel');
const Registreruser = require("../Model/authModel")
const DrinksModel = require("../Model/DrinksModel")


// Ensure the "public" directory exists
const publicDir = path.join(__dirname, "../../", "public");
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log(`✅ "public" folder created at: ${publicDir}`);


}


const GenerateQR = async (req: any, res: any) => {
    console.log("Request Body:", req.body);
    try {
        const email = req.body.email;
        console.log("Received email:", email);
        const isemailexist = await Registreruser.findOne({ email })
        if (!isemailexist) {
            return res.status(400).json({ message: "Email not Found in the database" })
        }
        if (!email || email === "undefined") {
            return res.status(400).json({ error: "Email parameter is missing or invalid" });
        }

        // don't show the link url when the qr is scanned the then direct redirect to the "qrData" page 


        // const qrData: string = `http://localhost:5000/get-menu/${encodeURIComponent(email)}`;
        // const qrData: string = `http://localhost:5000/generate-qr/get-menu`;
        const qrData: string = `https://l59b0rw5-54917.inc1.devtunnels.ms/`;


        // const qrData: string = `http://localhost:5000/generate-qr/get-url`;

        // const qrFilePath = path.join(__dirname, "public", `${email}.png`);
        const qrFilePath = path.join(publicDir, `${email}.png`);
        const qrFileUrl = `https://qrbackend-5.onrender.com/${email}.png`;

        if (fs.existsSync(qrFilePath)) {
            console.log("QR already exists, sending existing file.");
            return res.json({ qrCodeUrl: qrFileUrl, email: email, success: true });
        }


        await QRCode.toFile(qrFilePath, qrData);

        res.json({ qrCodeUrl: `https://qrbackend-5.onrender.com/${email}.png`, email: email, success: true });

    } catch (error: any) {
        console.error("QR Code generation error:", error.message, error.stack);
        res.status(500).json({ error: "Failed to generate QR code", success: false });
    }
}


const GetMenuByEmail = async (req: any, res: any) => {
    try {

        const nonVegMenu = await NonVeg.find();
        const vegMenu = await Veg.find();
        const Drinkingitem = await DrinksModel.find();
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
    } catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).json({ message: "Something went wrong", error, success: false });
    }
};


// const redirectitwebsite = async (req: any, res: any) => {
//     const email = req.params.email;
//     res.redirect(`https://suvrajyotirout.netlify.app`);
// }

module.exports = { GenerateQR, GetMenuByEmail }