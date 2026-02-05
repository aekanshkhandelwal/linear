const router = require('express').Router();
const User = require('../models/User');
const Team = require('../models/Team');
const Workspace = require('../models/Workspace');

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { googleId, email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found. Please sign up." });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message || "Internal Server Error" });
    }
});

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { googleId, email, name, picture } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists. Please log in." });
        }

        // Create new user
        user = new User({
            googleId,
            email,
            name,
            picture
        });

        const savedUser = await user.save();

        // Auto-create initial team for the user
        const firstName = name.split(' ')[0];
        const teamName = `${firstName}'s Team`;
        const identifier = firstName.substring(0, 3).toUpperCase();

        const newTeam = new Team({
            name: teamName,
            identifier: identifier,
            owner: savedUser._id,
            members: [{ user: savedUser._id, role: 'admin' }]
        });

        await newTeam.save();

        // Auto-create default workspace
        const newWorkspace = new Workspace({
            name: `${firstName}'s Workspace`,
            owner: savedUser._id,
            members: [{ user: savedUser._id, role: 'admin' }]
        });
        await newWorkspace.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message || "Internal Server Error" });
    }
});

module.exports = router;
