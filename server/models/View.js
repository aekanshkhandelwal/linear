const mongoose = require('mongoose');

const ViewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visibility: {
        type: String,
        enum: ['Personal', 'Team', 'Public'],
        default: 'Personal'
    },
    type: {
        type: String,
        enum: ['issues', 'projects'],
        default: 'projects'
    },
    filters: {
        type: Object,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('View', ViewSchema);
