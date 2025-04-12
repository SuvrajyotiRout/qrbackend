"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const NonVeg = require('../Model/NonVegModel');
const GetNonVeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalNonVegItems = yield NonVeg.countDocuments();
        const Nonvegdata = yield NonVeg.find();
        // const totalNonVegItems = Nonvegdata.length;
        res.status(200).json({ message: "Data get Sucessfully", success: true, Nonvegdata: Nonvegdata, totalNonVegItems: totalNonVegItems });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "something went wrong", error: error, success: false, });
    }
});
const CreateNonVeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("BODY RECEIVED:", req.body);
    console.log("HEADERS:", req.headers);
    try {
        const { nonvegdishname, priceFull, priceHalf, description } = req.body;
        const nonvegdishImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!nonvegdishname || !description) {
            return res.status(400).json({ message: "Please Fill nonvegdishname" });
        }
        if (!nonvegdishImage) {
            return res.status(400).json({ message: "Please Fill nonvegdishImage" });
        }
        const NewnonVeg = yield NonVeg.create({
            nonvegdishname: nonvegdishname,
            nonvegdishImage: nonvegdishImage,
            description: description,
            priceHalf: priceHalf,
            priceFull: priceFull,
            // userId: req.admin.id,
        });
        console.log(NewnonVeg);
        // const nonveg = await NewnonVeg.save();
        res.status(201).json({ message: "NonVeg Created successfully", success: true, NewnonVeg: NewnonVeg });
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, });
        console.log(error);
    }
});
const UpdateNonVeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { nonvegdishname, priceFull, priceHalf, description } = req.body;
        const nonvegdishImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!nonvegdishname || !description) {
            return res.status(400).json({ message: "Please Fill All the fields" });
        }
        const UpdateVeg = yield NonVeg.findByIdAndUpdate(req.params.id, {
            nonvegdishname: nonvegdishname,
            nonvegdishImage: nonvegdishImage,
            description: description,
            priceHalf: priceHalf,
            priceFull: priceFull
        }, { new: true, runValidators: true });
        res.status(201).json({ message: "Veg Updated successfully", success: true, UpdatedVeg: UpdateVeg });
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, });
    }
});
const DeleteNonVeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const existingItem = await NonVeg.findById(req.params.id);
        // if (!existingItem || existingItem.userId.toString() !== req.admin.id) {
        //     return res.status(403).json({ message: "Unauthorized" });
        // }
        if (!req.params.id) {
            res.status(400).json({ message: "Id not Found" });
        }
        const deleteVeg = yield NonVeg.findByIdAndDelete(req.params.id);
        if (deleteVeg) {
            res.status(200).json({ message: "Non-Veg Deleted Successfully", deleteVeg: deleteVeg, success: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, });
    }
});
module.exports = {
    GetNonVeg,
    CreateNonVeg,
    UpdateNonVeg,
    DeleteNonVeg
};
