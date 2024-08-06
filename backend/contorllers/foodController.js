const foodModel = require('../models/foodModel.js');
const fs = require('fs');

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "ERROR" });
    }
}

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    }
    catch (err) {
        res.json({ success: false, data: err })
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food Removed' })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "error" })
    }
}

module.exports = { addFood, listFood, removeFood };