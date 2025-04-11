import express from "express";
const NonvegRouter = express.Router();
const NonvegController = require("../Controller/nonvegController")
const { Authentication } = require("../Middleware/AuthMiddleware")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


NonvegRouter.get("/", NonvegController.GetNonVeg);
NonvegRouter.post("/", upload.single("nonvegdishImage"), Authentication, NonvegController.CreateNonVeg);
NonvegRouter.put("/:id", upload.single("nonvegdishImage"), Authentication, NonvegController.UpdateNonVeg);
NonvegRouter.delete("/:id", Authentication, NonvegController.DeleteNonVeg);

module.exports = NonvegRouter;