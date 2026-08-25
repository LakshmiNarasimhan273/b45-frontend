const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "in progress", "completed"],
    }
});

const Tasks = mongoose.model("tasks", taskSchema);
module.exports = Tasks;