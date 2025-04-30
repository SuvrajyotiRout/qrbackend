
const DrinksModel = require("../Model/DrinksModel");

const GetDrinks = async (req: any, res: any) => {
    try {
        const Drinks = await DrinksModel.find();
        if (Drinks) {
            return res.status(200).json({ message: "Drinks Fetched Successfully...", success: true, data: Drinks })
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error...", success: false, error })

    }
}

const PostDrinks = async (req: any, res: any) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file?.filename;
        if (!name || !description || !price || !image) {
            return res.status(400).json({ message: "Please Enter All details..." })

        }
        const Drinks = await DrinksModel.create({
            name: name,
            description: description,
            image: image,
            price: price
        });
        return res.status(201).json({ message: "Drinks created Successfully...", success: true, data: Drinks })

    } catch (error) {
        return res.status(500).json({ message: "internal server error...", success: false, error })

    }
}

const UpdateDrinks = async (req: any, res: any) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file?.filename;
        if (!name || !description || !price || !image) {
            return res.status(400).json({ message: "Please Enter All details..." })

        }
        const Drink = await DrinksModel.findByIdAndUpdate(req.params.id, {
            name: name,
            description: description,
            image: image,
            price: price
        }, { new: true, runValidators: true });
        return res.status(201).json({ message: "Drinks Updated Successfully...", success: true, data: Drink })

    } catch (error) {
        return res.status(500).json({ message: "internal server error...", success: false, error })

    }
}

const DeleteDrinks = async (req: any, res: any) => {
    try {
        const Drinks = await DrinksModel.findByIdAndDelete(req.params.id);
        if (Drinks) {
            return res.status(200).json({ message: "Drinks Deleted Successfully...", success: true, data: Drinks })

        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error...", success: false, error })

    }
}


module.exports = {
    GetDrinks, PostDrinks, UpdateDrinks, DeleteDrinks
}