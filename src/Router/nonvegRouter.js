"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NonvegRouter = express_1.default.Router();
const NonvegController = require("../Controller/nonvegController");
const { Authentication } = require("../Middleware/AuthMiddleware");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
NonvegRouter.get("/", NonvegController.GetNonVeg);
NonvegRouter.post("/", upload.single("nonvegdishImage"), Authentication, NonvegController.CreateNonVeg);
NonvegRouter.put("/:id", upload.single("nonvegdishImage"), Authentication, NonvegController.UpdateNonVeg);
NonvegRouter.delete("/:id", Authentication, NonvegController.DeleteNonVeg);
module.exports = NonvegRouter;
