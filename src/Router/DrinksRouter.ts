import express from "express";
const DrinksRouter = express.Router();
const { Authentication } = require("../Middleware/AuthMiddleware");
const { GetDrinks, PostDrinks, UpdateDrinks, DeleteDrinks
} = require("../Controller/DrinksController")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


DrinksRouter.get("/", GetDrinks);
DrinksRouter.post("/", upload.single("image"), Authentication, PostDrinks);
DrinksRouter.put("/:id", upload.single("image"), Authentication, UpdateDrinks);
DrinksRouter.delete("/:id", Authentication, DeleteDrinks);

module.exports = DrinksRouter;