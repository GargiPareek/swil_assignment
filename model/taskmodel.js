const mongoose = require('mongoose');
const User = require("../model/usermodel")
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    username: {
        type: String,
        ref: 'User',
        required: true,
        index: true
    },
    action: { type: String, required: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['high', 'medium', 'low'], required: true },
    status: { type: String, enum: ['not started', 'partially done', 'in progress', 'completed'], required: true, index: true },
    dueDate: { type: Date, required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
