"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const vegSchema = new mongoose_1.default.Schema({
    vegdishname: {
        type: String,
        required: true,
    },
    vegdishImage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priceHalf: {
        type: Number
    },
    priceFull: {
        type: Number,
    }
}, { timestamps: true });
const Veg = mongoose_1.default.model('Veg', vegSchema);
module.exports = Veg;
