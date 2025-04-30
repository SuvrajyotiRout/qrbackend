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
const DrinksModel = require("../Model/DrinksModel");
const GetDrinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Drinks = yield DrinksModel.find();
        if (Drinks) {
            return res.status(200).json({ message: "Drinks Fetched Successfully...", success: true, data: Drinks });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error...", success: false, error });
    }
});
const PostDrinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, description, price } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!name || !description || !price || !image) {
            return res.status(400).json({ message: "Please Enter All details..." });
        }
        const Drinks = yield DrinksModel.create({
            name: name,
            description: description,
            image: image,
            price: price
        });
        return res.status(201).json({ message: "Drinks created Successfully...", success: true, data: Drinks });
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error...", success: false, error });
    }
});
const UpdateDrinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, description, price } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!name || !description || !price || !image) {
            return res.status(400).json({ message: "Please Enter All details..." });
        }
        const Drink = yield DrinksModel.findByIdAndUpdate(req.params.id, {
            name: name,
            description: description,
            image: image,
            price: price
        }, { new: true, runValidators: true });
        return res.status(201).json({ message: "Drinks Updated Successfully...", success: true, data: Drink });
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error...", success: false, error });
    }
});
const DeleteDrinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Drinks = yield DrinksModel.findByIdAndDelete(req.params.id);
        if (Drinks) {
            return res.status(200).json({ message: "Drinks Deleted Successfully...", success: true, data: Drinks });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error...", success: false, error });
    }
});
module.exports = {
    GetDrinks, PostDrinks, UpdateDrinks, DeleteDrinks
};
