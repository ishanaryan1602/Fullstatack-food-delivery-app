const userMdoel = require("../models/userModel");

const addToCart = async (req, res) => {
    try {
        let userData = await userMdoel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId]++;
        }
        await userMdoel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Added to cart" })
    }
    catch (err) {
        console.log(err.message);
        res.json({ success: false, message: "Failed to add to cart" });
    }
}

const removeFromCart = async (req, res) => {

}

const getCart = async (req, res) => {

}

module.exports = {
    addToCart,
    removeFromCart,
    getCart,
}