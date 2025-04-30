"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DrinkSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    }
}, { timestamps: true });
const DrinksModel = mongoose_1.default.model('DrinksModel', DrinkSchema);
module.exports = DrinksModel;
