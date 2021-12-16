require('dotenv').config({
    path: "./config/.env"
});
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');



const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const connectDB = require('./config/Dbconfig');
app.use("/uploads", express.static("uploads"))
// *MIDDLEWARE
const user = require('./app/middleware/user');
const authAdmin = require('./app/middleware/auth');

// *Routes
app.use("/auth", require('./app/router/authRouter.js'))
app.use("/", user, require('./app/router/index.js'))
app.use("/payment", user, require('./app/router/paymentRouter'))
app.use("/secure", authAdmin,
    require('./app/router/movieRouter.js'),
    require('./app/router/categoryRouter.js'),
    require('./app/router/secureRouter.js'))


// *DATABASE
connectDB()

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is Running on Port ${port}`);
})