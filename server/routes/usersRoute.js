const express = require("express");
const { 
    registerUserCrtl, 
    userLoginCtrl, 
    userProfileCtrl,
    deleteUserCtrl,
    updateUserCtrl,
} = require("../controllers/usersCtrl");
const isLogin = require("../middlewares/isLogin");
const usersRoute = express.Router();


// POST/users/register
usersRoute.post('/register', registerUserCrtl);

// POST/users/login
usersRoute.post("/login", userLoginCtrl);

// GET/users/profile
usersRoute.get("/profile", isLogin, userProfileCtrl);

// DELETE/users
usersRoute.delete("/", isLogin, deleteUserCtrl);

// PUT/users
usersRoute.put("/", isLogin, updateUserCtrl);

module.exports = usersRoute;