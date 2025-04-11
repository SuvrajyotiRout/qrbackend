import express from "express";
const Vegrouter = express.Router();
const VegController = require("../Controller/vegController");
const { Authentication } = require("../Middleware/AuthMiddleware")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


Vegrouter.get("/", VegController.GetVeg);
Vegrouter.post("/", upload.single("vegdishImage"), Authentication, VegController.CreateVeg);
Vegrouter.put("/:id", upload.single("vegdishImage"), Authentication, VegController.UpdateVeg);
Vegrouter.delete("/:id", Authentication, VegController.DeleteVeg);

module.exports = Vegrouter;