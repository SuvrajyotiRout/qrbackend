const Veg = require('../Model/vegModel');


const GetVeg = async (req: any, res: any) => {
    try {
        const totalVegItems = await Veg.countDocuments()
        const vegdata = await Veg.find();
        res.status(200).json({ message: "Data get Sucessfully", success: true, vegdata: vegdata, totalVegItems: totalVegItems })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, })
    }
}
const CreateVeg = async (req: any, res: any) => {
    console.log(req.body);
    console.log("create hit");


    try {
        const { vegdishname, priceFull, priceHalf, description } = req.body;
        const vegdishImage = req.file?.filename;
        if (!vegdishImage || !vegdishname || !description) {
            return res.status(400).json({ message: "Please Fill All the fields" })
        }
        const NewVeg = await Veg.create({
            vegdishname: vegdishname,
            vegdishImage: vegdishImage,
            description: description,
            priceHalf: priceHalf,
            priceFull: priceFull
        })
        // await NewVeg.save();
        res.status(201).json({ message: "Veg Created successfully", success: true, NewVeg: NewVeg })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error, success: false, })

    }
}
const UpdateVeg = async (req: any, res: any) => {
    try {
        const { vegdishname, priceFull, priceHalf, description } = req.body;
        const vegdishImage = req.file?.filename;

        if (!vegdishImage || !vegdishname || !description) {
            return res.status(400).json({ message: "Please Fill All the fields" })
        }
        const UpdateVeg = await Veg.findByIdAndUpdate(req.params.id, {
            vegdishname: vegdishname,
            vegdishImage: vegdishImage,
            description: description,
            priceHalf: priceHalf,
            priceFull: priceFull
        }, { new: true, runValidators: true });

        res.status(201).json({ message: "Veg Updated successfully", success: true, UpdatedVeg: UpdateVeg })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, })

    }
}
const DeleteVeg = async (req: any, res: any) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Id not Found" })
        }
        const deleteVeg = await Veg.findByIdAndDelete(req.params.id);
        if (deleteVeg) {
            res.status(200).json({ message: "Veg Deleted Successfully", deleteVeg: deleteVeg, success: true })
        }
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error, success: false, })

    }
}

module.exports = {
    GetVeg,
    CreateVeg,
    UpdateVeg,
    DeleteVeg
}