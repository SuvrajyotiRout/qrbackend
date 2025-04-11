import mongoose from "mongoose";

const NonvegSchema = new mongoose.Schema({
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

const NonVeg = mongoose.model('NonVeg', NonvegSchema);
module.exports = NonVeg;