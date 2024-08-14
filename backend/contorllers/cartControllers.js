const userMdoel = require("../models/userModel");

const addToCart = async (req, res) => {
    try {
        let userData = await userMdoel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
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
        res.json({ success: false, message: "Failed to add to cart"});
    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userMdoel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId]--;
        }
        await userMdoel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: "Failed to remove from cart" });
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await userMdoel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })

    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: "Error" });
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getCart,
}