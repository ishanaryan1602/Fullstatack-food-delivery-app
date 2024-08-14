const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const foodrRouter = require('./routes/foodRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food",foodrRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => console.log('server running on port', port));

