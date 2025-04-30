import mongoose from "mongoose";

const DrinkSchema = new mongoose.Schema({
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
const DrinksModel = mongoose.model('DrinksModel', DrinkSchema);
module.exports = DrinksModel;