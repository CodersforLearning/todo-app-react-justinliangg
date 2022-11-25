const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter userId"],
        ref: 'User'
    },
    
    desc: String
});


module.exports = mongoose.model("Todo", todoSchema);