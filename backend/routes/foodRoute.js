const express = require('express');
const { addFood, listFood, removeFood } = require('../contorllers/foodController');
const multer = require('multer');

const foodrRouter = express.Router();

const storage = multer.diskStorage({
    destination : "uploads",
    filename : (req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    },
});

const upload = multer({ storage:storage });

foodrRouter.post("/add", upload.single("image") ,addFood);
foodrRouter.get("/list",listFood)
foodrRouter.post("/remove",removeFood)

module.exports = foodrRouter;