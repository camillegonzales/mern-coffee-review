const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register user
const registerUserCrtl = async (req,res) => {
    const {userName, email, password} = req.body;
    try {
        // Check if email exists
        const userFound = await User.findOne({email});
        if (userFound) {
            return res.json({
                error: "Email already in use"
            });
        }
        // Check if any fields are empty
        if (!userName || !email || !password) {
            return res.json({
                error: "All fields are required"
            });
        }
        // Check if password is valid
        if (password.length < 6) {
            return res.json({
                error: "Password must be at least 6 characters"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
        });
        res.json({
            status: "Success",
            user,
        });
    } catch (error) {
        res.json(error);
    }
};

// Login user
const userLoginCtrl = async (req,res) => {
    const {email, password} = req.body;
    try {
        // Check if email exists
        const userFound = await User.findOne({email});
        if (!userFound) {
            return res.json({
                error: "Invalid login credentials"
            });
        }

        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, userFound.password);
        if (!isPasswordMatch) {
            return res.json({
                error: "Invalid login credentials"
            });
        }

        res.json({
            status: "success",
            userFound,
            token: generateToken(userFound._id)
        });
    } catch (error) {
        res.json(error);
    }
};

// User profile
const userProfileCtrl = async (req,res) => {
    try {
        res.json({msg: "User profile route"});
    } catch (error) {
        res.json(error);
    }
};

// Delete user
const deleteUserCtrl = async (req,res) => {
    try {
        res.json({msg: "Delete user route"});
    } catch (error) {
        res.json(error);
    }
};

// Update user
const updateUserCtrl = async (req,res) => {
    try {
        res.json({msg: "Update user route"});
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    registerUserCrtl,
    userLoginCtrl,
    userProfileCtrl,
    deleteUserCtrl,
    updateUserCtrl,
};