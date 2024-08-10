const userMdoel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = userMdoel.findOne({ email })

        if (!user) { return res.json({ success: false, message: "User not found" }) }
        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Password is incorrect"
            })
        }
        const token = await createToken(user._id);
        return res.json({ success: true, token })
    } catch (err) {
        console.log(err.message);
        return res.json({ success: false, message: "Error" });
    }
}

const createToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userMdoel.findOne({ email });
        if (exists) return res.json({ success: "false" });
        if (!validator.isEmail(email)) {
            return res.json({ success: "false", message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: "false", message: "Please enter a strong password" });
        }
        const salt = await bcrypt.genSalt(10);
        // console.log("salt");

        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log("hash pwd");

        const newUser = new userMdoel({ name: name, password: hashedPassword, email: email });
        // console.log("new user");

        const user = await newUser.save();
        // console.log("user save");

        const token = await createToken(user._id);
        // console.log('token');

        return res.json({ success: "true", token })
    }
    catch (err) {
        console.log(err);
        res.json({ success: "true", message: "Error" })
    }
}

module.exports = {
    loginUser,
    registerUser,
};