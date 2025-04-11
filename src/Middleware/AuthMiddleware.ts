import jwt from "jsonwebtoken";

const Authentication = (req: any, res: any, next: any) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: "Please Login to Access...", })
    }
    try {
        const decode = jwt.verify(token, "SECRET_KEY");
        console.log("Decoded Token:", decode);
        req.admin = decode;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });

    }
}
module.exports = { Authentication }