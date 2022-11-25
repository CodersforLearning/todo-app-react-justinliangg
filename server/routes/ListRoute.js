const express = require('express');
const router = express.Router();
const TodoModel = require("../models/TodoModel");
const protect = require("../middleware/AuthMiddleware");
const asyncHandler = require("express-async-handler");

//get all todos
router.get("/", protect, asyncHandler(async (req, res, next) => { 
    //getting user info
    const userId = req.user.id;

    //getting all todos by user
    let todos = await TodoModel.find({ user: userId });
    return res.status(200).json(todos);
}));

//add todo
router.post("/", protect, asyncHandler(async (req, res, next) => {
    //getting user info
    const userId = req.user.id;
    
    //no todo desc
    if(!req.body.desc) {
        res.status(400);
        throw new Error("Missing todo description")
    }

    let newTodo = await TodoModel.create({user: userId, desc: req.body.desc});
    return res.status(200).json(newTodo.toJSON());
}));

//delete todo
router.delete("/:id", protect, asyncHandler(async (req, res) => {
    if(!req.params.id){
       res.status(400);
       throw new Error("Todo id missing");
    };

    //checking if valid number.
    let deleteId = parseInt(req.params.id);
    if(Number.isNaN(deleteId)){
        res.status(400);
        throw new Error("ID is not a number");
    }    

    //checking if deleting user's todo and not somebody elses.
    const userId = req.user.id;
    const todoFound = await TodoModel.findOne({ _id: req.params.id });
    if(todoFound.user.toString() !== userId){
        res.status(401);
        throw new Error("Not authorised to delete todo");
    }

    //deleting 
    await TodoModel.findByIdAndDelete(req.params.id);
    return res.status(200).end();
}));

module.exports = router