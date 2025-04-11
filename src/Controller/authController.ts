const Registreruser = require('../Model/authModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SignUpAdmin = async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body;
        console.log("DATA" + req.body.email);

        const isemailexist = await Registreruser.findOne({ email })
        if (isemailexist) {
            return res.status(400).json({ message: "This email is Already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Registreruser({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'user registered successfully', newuser: newUser, success: true });

    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong', success: false, error: error });
    }
}
const LoginAdmin = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const isuserexist = await Registreruser.findOne({ email });
        if (!isuserexist) {
            return res.status(404).json({ message: "Uaer not found" })
        }
        const isposswordmatch = await bcrypt.compare(password, isuserexist.password);
        if (!isposswordmatch) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }
        const token = jwt.sign({ id: isuserexist._id }, "SECRET_KEY", { expiresIn: "1h" });
        res.status(200).json({ message: 'user Login successfully', TOKEN: token, success: true });

    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong', success: false, error: error });

    }


}


const ForgetPassword = async (req: any, res: any) => {

}
const ResetPassword = async (req: any, res: any) => {

}
module.exports = {
    SignUpAdmin,
    LoginAdmin,
    ForgetPassword,
    ResetPassword
}