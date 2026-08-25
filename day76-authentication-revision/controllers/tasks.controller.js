const taskModel = require("../models/tasks.model");

// GET
const allTasks = async (req, res) => {
    try{
        const tasks = await taskModel.find();
        res.status(200).json({success: true, tasks});
    }catch(err){
        res.status(500).json({success: false, message: "Task Fetching Failed"});
    }
};

// POST
const createTask = async (req, res) => {
    try{
        const {title, status} = req.body;

        if(!title || !status){
            return res.status(400).json({success: false, message: "Both the fields are required"})
        };

        const task = await taskModel.create({title, status});
        res.status(201).json({success: true, task});
    }catch(err){
         res.status(500).json({success: false, message: "Task Creation Failed"});
    }
}

// PUT
const updateTask = async (req, res) => {
    try{
        const updatedTask = await taskModel.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        res.status(200).json({success: true, updatedTask});
    }catch(err){
         res.status(500).json({success: false, message: "Task Updation Failed"});
    }
}

// DELETE
const deleteTask = async (req, res) => {
    try{
        await taskModel.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "Task removed"});
    }catch(err){
         res.status(500).json({success: false, message: "Task Deletion Failed"});
    }
}

module.exports = { allTasks, createTask, updateTask, deleteTask };