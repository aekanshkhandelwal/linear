const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    identifier: {
        type: String,
        required: true,
        uppercase: true, 
    },
    timezone: {
        type: String,
        default: 'GMT+5:30 - India Standard Time - Kolkata',
    },
    icon: {
        type: String, 
        default: 'User', 
    },
    owner: {
        type: String, 
        required: true
    },
    members: [{
        user: {
            type: String,
            ref: 'User'
        },
        role: {
            type: String,
            default: 'member'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Team', TeamSchema);
