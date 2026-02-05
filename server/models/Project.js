const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['backlog', 'planned', 'in_progress', 'completed', 'canceled'],
        default: 'backlog',
    },
    priority: {
        type: String,
        enum: ['no_priority', 'urgent', 'high', 'medium', 'low'],
        default: 'no_priority',
    },
    startDate: {
        type: String, 
    },
    targetDate: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    labels: [{
        type: String
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Project', ProjectSchema, 'Project');
