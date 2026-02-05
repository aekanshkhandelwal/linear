const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: 'Todo',
        enum: ['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled', 'Duplicate']
    },
    priority: {
        type: String,
        default: 'No priority',
    },
    assignee: {
        type: String, 
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    labels: {
        type: [String],
        default: [],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    identifier: {
        type: String, 
    }
}, { timestamps: true });

module.exports = mongoose.model('Issue', IssueSchema);
