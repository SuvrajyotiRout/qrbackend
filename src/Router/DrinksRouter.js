"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DrinksRouter = express_1.default.Router();
const { Authentication } = require("../Middleware/AuthMiddleware");
const { GetDrinks, PostDrinks, UpdateDrinks, DeleteDrinks } = require("../Controller/DrinksController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
DrinksRouter.get("/", GetDrinks);
DrinksRouter.post("/", upload.single("image"), Authentication, PostDrinks);
DrinksRouter.put("/:id", upload.single("image"), Authentication, UpdateDrinks);
DrinksRouter.delete("/:id", Authentication, DeleteDrinks);
module.exports = DrinksRouter;
