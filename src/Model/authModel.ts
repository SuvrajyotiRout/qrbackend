import mongoose from "mongoose"

const RegisterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    resetPasswordOTP: {
        type: String
    },
    otpExpires: {
        type: Date
    }
})

const Registreruser = mongoose.model('Registreruser', RegisterSchema);
module.exports = Registreruser;