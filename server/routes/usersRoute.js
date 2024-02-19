const express = require("express");
const { 
    registerUserCrtl, 
    userLoginCtrl, 
    userProfileCtrl,
    deleteUserCtrl,
    updateUserCtrl,
} = require("../controllers/usersCtrl");
const usersRoute = express.Router();


// POST/api/users/register
usersRoute.post('/register', registerUserCrtl);

// POST/api/users/login
usersRoute.post("/login", userLoginCtrl);

// GET/api/users/profile/:id
usersRoute.get("/profile/:id", userProfileCtrl);

// DELETE/api/users/:id
usersRoute.delete("/:id", deleteUserCtrl);

// PUT/api/users/:id
usersRoute.put("/:id", updateUserCtrl);

module.exports = usersRoute;