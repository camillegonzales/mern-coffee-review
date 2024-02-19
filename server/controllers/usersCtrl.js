// Register user
const registerUserCrtl = async (req,res) => {
    try {
        res.json({msg: "Register user route"});
    } catch (error) {
        res.json(error);
    }
};

// Login user
const userLoginCtrl = async (req,res) => {
    try {
        res.json({msg: "Login user route"});
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