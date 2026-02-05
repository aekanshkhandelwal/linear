const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// Create a new issue
router.post('/', async (req, res) => {
    try {
        const { title, description, status, priority, assignee, project, labels, createdBy } = req.body;

        // Fetch the project to get the team ID
        const Project = require('../models/Project');
        const projectDoc = await Project.findById(project);

        if (!projectDoc) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const count = await Issue.countDocuments({ team: projectDoc.team }); 
        const identifier = `ISS-${count + 1}`; 
        const newIssue = new Issue({
            title,
            description,
            status,
            priority,
            assignee,
            project, 
            labels,
            createdBy,
            team: projectDoc.team, 
            identifier
        });

        const savedIssue = await newIssue.save();
        res.status(201).json(savedIssue);
    } catch (err) {
        console.error("Error creating issue:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Get issues assigned to a specific user (My Issues)
router.get('/my-issues/:userId', async (req, res) => {
    try {
        const issues = await Issue.find({ assignee: req.params.userId }).sort({ createdAt: -1 }).populate('project');
        res.status(200).json(issues);
    } catch (err) {
        console.error("Error fetching my issues:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

router.get('/project/:projectId', async (req, res) => {
    try {
        const issues = await Issue.find({ project: req.params.projectId }).sort({ createdAt: -1 });
        res.status(200).json(issues);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 });
        res.status(200).json(issues);
    } catch (err) {
        console.error("Error fetching issues:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Issue.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Issue deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

module.exports = router;
