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
const Veg = require('../Model/vegModel');
const GetVeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalVegItems = yield Veg.countDocuments();
        const vegdata = yield Veg.find();
        res.status(200).json({ message: "Data get Sucessfully", success: true, vegdata: vegdata, totalVegItems: totalVegItems });
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, });
    }
});
const CreateVeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    console.log("create hit");
    try {
        const { vegdishname, priceFull, priceHalf, description } = req.body;
        const vegdishImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!vegdishImage || !vegdishname || !description) {
            return res.status(400).json({ message: "Please Fill All the fields" });
        }
        const NewVeg = yield Veg.create({
            vegdishname: vegdishname,
            vegdishImage: vegdishImage,
            description: description,
            priceHalf: priceHalf,
            priceFull: priceFull
        });
        // await NewVeg.save();
        res.status(201).json({ message: "Veg Created successfully", success: true, NewVeg: NewVeg });
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong", error, success: false, });
    }
});
const UpdateVeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { vegdishname, priceFull, priceHalf, description } = req.body;
        const vegdishImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!vegdishImage || !vegdishname || !description) {
            return res.status(400).json({ message: "Please Fill All the fields" });
        }
        const UpdateVeg = yield Veg.findByIdAndUpdate(req.params.id, {
            vegdishname: vegdishname,
            vegdishImage: vegdishImage,
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
const DeleteVeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Id not Found" });
        }
        const deleteVeg = yield Veg.findByIdAndDelete(req.params.id);
        if (deleteVeg) {
            res.status(200).json({ message: "Veg Deleted Successfully", deleteVeg: deleteVeg, success: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, });
    }
});
module.exports = {
    GetVeg,
    CreateVeg,
    UpdateVeg,
    DeleteVeg
};
