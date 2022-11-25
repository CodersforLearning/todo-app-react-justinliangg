const express = require('express');
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");

router.post("/register", asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    
    //precheck
    if(!username || !password){
        res.status(400);
        throw new Error("Please add all fields");
    }

    //checking if user exists
    const userExists = await UserModel.findOne({username});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
        username: username,
        password: hashedPass
    });

    if(user){
        res.status(200).json({
            id: user._id,
            username: user.username,
            token: generateJWT(user.id)
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
}));


router.post("/login", asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    //precheck
    if(!username || !password){
        res.status(400);
        throw new Error("Please add all fields");
    }

    const user = await UserModel.findOne({username});
    //checking password matches
    if(user && await bcrypt.compare(password, user.password)){
        res.json({
            id: user.id,
            username: user.username,
            token: generateJWT(user.id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
}));


const generateJWT = (id) => {
    //TODO MAKE ENVIRONMENT VARIABLE FOR SECRET
    return jwt.sign({ id }, "abc123", {
        expiresIn: '30d'
    });
}

module.exports = router;