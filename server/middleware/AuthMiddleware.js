const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require('../models/UserModel');

//@desc: used to protect routes for authorisation
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            //getting token from header
            token = req.headers.authorization.split(' ')[1];

            //TODO: add secret to process env.
            //verifying the token.
            const decodedToken = jwt.verify(token, "abc123");

            //passing the user object to next route.
            req.user = await UserModel.findById(decodedToken.id);

            //go to next route
            next();

        } catch(error) {   
            res.status(401);
            throw new Error("Not Authorised!");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Token is missing");
    }
});


module.exports = protect;