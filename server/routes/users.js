const router = require('express').Router();
const User = require('../models/User');
const Workspace = require('../models/Workspace');

// Search users by name or email
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json([]);

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }, 'name email picture').limit(10);

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get members of the user's workspace
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query; // Expect userId to identify which workspace
        if (!userId) return res.status(400).json({ message: "User ID required" });

        // Find workspace where user is a member
        const workspace = await Workspace.findOne({ "members.user": userId }).populate('members.user', 'name email picture');

        if (!workspace) {
            const user = await User.findById(userId, 'name email picture');
            return res.json(user ? [user] : []);
        }

        const members = workspace.members.map(m => m.user);
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Invite a member to the workspace
router.post('/invite', async (req, res) => {
    try {
        const { email, invitedByUserId } = req.body;

        const userToInvite = await User.findOne({ email });
        if (!userToInvite) {
            return res.status(404).json({ message: "User not found with this email." });
        }

        let workspace = await Workspace.findOne({ "members.user": invitedByUserId });
        if (!workspace) {
            // Auto-create workspace for existing users who don't have one
            const user = await User.findById(invitedByUserId);
            if (!user) return res.status(404).json({ message: "Inviting user not found." });

            workspace = new Workspace({
                name: `${user.name.split(' ')[0]}'s Workspace`,
                owner: user._id,
                members: [{ user: user._id, role: 'admin' }]
            });
            await workspace.save();
        }

        // Check if already member
        const isMember = workspace.members.some(m => m.user.toString() === userToInvite._id.toString());
        if (isMember) {
            return res.status(400).json({ message: "User is already a member." });
        }

        workspace.members.push({ user: userToInvite._id, role: 'member' });
        await workspace.save();

        res.status(200).json({ message: "User invited successfully", user: userToInvite });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
