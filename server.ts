const express = require('express')
const app = express()
const dotenv = require('dotenv');
const ConnectDB = require('./Config/db');
const cors = require("cors");
const Authrouter = require('./src/Router/authRouter')
const Vegrouter = require("./src/Router/vegRouter")
const NonvegRouter = require("./src/Router/nonvegRouter");
const QrcodeRouter = require("./src/Router/qrCodeRouter");
const DrinksRouter = require("./src/Router/DrinksRouter")
import path = require("path");
dotenv.config();
ConnectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, './public')));

app.use('/uploads', express.static('uploads'));


app.get('/', (req: any, res: any) => {
    res.send('Hello World!')
})
app.use('/Auth', Authrouter);
app.use('/menu/Veg', Vegrouter,);
app.use('/menu/Non-Veg', NonvegRouter);
app.use("/generate-qr", QrcodeRouter);
app.use("/Drinks", DrinksRouter);

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})




