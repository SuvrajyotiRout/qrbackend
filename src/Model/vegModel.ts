import mongoose from "mongoose";

const vegSchema = new mongoose.Schema({
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

const Veg = mongoose.model('Veg', vegSchema);
module.exports = Veg;