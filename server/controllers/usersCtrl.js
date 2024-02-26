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
    console.log(req.user);
    try {
        const user = await User.findById(req.user).populate(
            "bookmarks reviews"
        );
        res.json(user);
    } catch (error) {
        res.json(error);
    }
};

// Delete user
const deleteUserCtrl = async (req,res) => {
    try {
        await User.findByIdAndDelete(req.user);
        res.status(200).json({
            status: "success",
            data: null
        });
    } catch (error) {
        res.json(error);
    }
};

// Update user
const updateUserCtrl = async (req,res) => {
    try {
        // Check if email exists
        if (req.body.email) {
            const userFound = await User.findOne({email: req.body.email});
            if (userFound) {
                return res.json({
                    error: "Email already in use"
                });
            } 
        }
        
        // Check if user is updating the password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Update the user
            const user = await User.findByIdAndUpdate(
                req.user,
                {
                    password: hashedPassword,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            return res.status(200).json({
                status: "success",
                data: user,
            });
        }

        const user = await User.findByIdAndUpdate(req.user, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: user,
        });
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