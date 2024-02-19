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


// POST/api/users/register
usersRoute.post('/register', registerUserCrtl);

// POST/api/users/login
usersRoute.post("/login", userLoginCtrl);

// GET/api/users/profile
usersRoute.get("/profile", isLogin, userProfileCtrl);

// DELETE/api/users
usersRoute.delete("/", isLogin, deleteUserCtrl);

// PUT/api/users
usersRoute.put("/", isLogin, updateUserCtrl);

module.exports = usersRoute;