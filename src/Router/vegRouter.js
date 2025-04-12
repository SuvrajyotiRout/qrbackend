"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Vegrouter = express_1.default.Router();
const VegController = require("../Controller/vegController");
const { Authentication } = require("../Middleware/AuthMiddleware");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
Vegrouter.get("/", VegController.GetVeg);
Vegrouter.post("/", upload.single("vegdishImage"), Authentication, VegController.CreateVeg);
Vegrouter.put("/:id", upload.single("vegdishImage"), Authentication, VegController.UpdateVeg);
Vegrouter.delete("/:id", Authentication, VegController.DeleteVeg);
module.exports = Vegrouter;
