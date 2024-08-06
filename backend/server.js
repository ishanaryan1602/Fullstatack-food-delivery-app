const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const foodrRouter = require('./routes/foodRoute');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food",foodrRouter)
app.use("/images",express.static('uploads'))

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => console.log('server running on port', port));

