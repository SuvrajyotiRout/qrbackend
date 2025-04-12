"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NonvegSchema = new mongoose_1.default.Schema({
    nonvegdishname: {
        type: String,
        required: true,
    },
    nonvegdishImage: {
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
        type: Number
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Registreruser',
    //     required: true
    // }
}, { timestamps: true });
const NonVeg = mongoose_1.default.model('NonVeg', NonvegSchema);
module.exports = NonVeg;
