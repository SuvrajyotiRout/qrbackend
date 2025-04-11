const NonVeg = require('../Model/NonVegModel')

const GetNonVeg = async (req: any, res: any) => {
    try {
        const totalNonVegItems = await NonVeg.countDocuments();

        const Nonvegdata = await NonVeg.find();

        // const totalNonVegItems = Nonvegdata.length;
        res.status(200).json({ message: "Data get Sucessfully", success: true, Nonvegdata: Nonvegdata, totalNonVegItems: totalNonVegItems })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "something went wrong", error: error, success: false, })
    }
}
const CreateNonVeg = async (req: any, res: any) => {
    console.log("BODY RECEIVED:", req.body);
    console.log("HEADERS:", req.headers);

    try {
        const { nonvegdishname, priceFull, priceHalf, description } = req.body;
        const nonvegdishImage = req.file?.filename;
        if (!nonvegdishname || !description) {
            return res.status(400).json({ message: "Please Fill nonvegdishname" })
        }
        if (!nonvegdishImage) {
            return res.status(400).json({ message: "Please Fill nonvegdishImage" })
        }
        const NewnonVeg = await NonVeg.create({
            nonvegdishname: nonvegdishname,
            nonvegdishImage: nonvegdishImage,
            description: description,
            priceHalf: priceHalf,
            priceFull: priceFull,
            // userId: req.admin.id,
        })
        console.log(NewnonVeg);

        // const nonveg = await NewnonVeg.save();
        res.status(201).json({ message: "NonVeg Created successfully", success: true, NewnonVeg: NewnonVeg })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, })
        console.log(error);

    }
}
const UpdateNonVeg = async (req: any, res: any) => {
    try {

        const { nonvegdishname, priceFull, priceHalf, description } = req.body;
        const nonvegdishImage = req.file?.filename;

        if (!nonvegdishname || !description) {
            return res.status(400).json({ message: "Please Fill All the fields" })
        }
        const UpdateVeg = await NonVeg.findByIdAndUpdate(req.params.id, {
            nonvegdishname: nonvegdishname,
            nonvegdishImage: nonvegdishImage,
            description: description,
            priceHalf: priceHalf,
            priceFull: priceFull
        }, { new: true, runValidators: true });

        res.status(201).json({ message: "Veg Updated successfully", success: true, UpdatedVeg: UpdateVeg })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, })

    }
}
const DeleteNonVeg = async (req: any, res: any) => {
    try {
        // const existingItem = await NonVeg.findById(req.params.id);

        // if (!existingItem || existingItem.userId.toString() !== req.admin.id) {
        //     return res.status(403).json({ message: "Unauthorized" });
        // }

        if (!req.params.id) {
            res.status(400).json({ message: "Id not Found" })
        }
        const deleteVeg = await NonVeg.findByIdAndDelete(req.params.id);
        if (deleteVeg) {
            res.status(200).json({ message: "Non-Veg Deleted Successfully", deleteVeg: deleteVeg, success: true })
        }
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, })

    }
}

module.exports = {
    GetNonVeg,
    CreateNonVeg,
    UpdateNonVeg,
    DeleteNonVeg
}