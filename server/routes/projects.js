const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Create a new project
router.post('/', async (req, res) => {
    try {
        const { name, summary, description, status, priority, startDate, targetDate, userId, teamId } = req.body;

        const newProject = new Project({
            name,
            summary,
            description,
            status,
            priority,
            startDate,
            targetDate,
            createdBy: userId,
            team: teamId
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all projects for a user's workspace (Projects where user is a member of the team)
router.get('/:userId', async (req, res) => {
    try {
        const Team = require('../models/Team');
        const teams = await Team.find({ "members.user": req.params.userId });

        const teamIds = teams.map(team => team._id);

        const projects = await Project.find({ team: { $in: teamIds } }).sort({ createdAt: -1 });

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
