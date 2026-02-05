const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Get all teams for a specific user (owner or member)
router.get('/:userId', async (req, res) => {
    try {
        console.log('GET /teams/:userId request for:', req.params.userId);
        const teams = await Team.find({
            $or: [
                { owner: req.params.userId },
                { "members.user": req.params.userId }
            ]
        }).sort({ createdAt: 1 });
        console.log('Found teams:', teams);
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new team
router.post('/', async (req, res) => {
    const { name, identifier, timezone, owner, icon } = req.body;

    const team = new Team({
        name,
        identifier: identifier.toUpperCase(),
        timezone,
        owner,
        icon,
        members: [{ user: owner, role: 'admin' }]
    });

    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
