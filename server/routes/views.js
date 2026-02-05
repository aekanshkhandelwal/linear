const express = require('express');
const router = express.Router();
const View = require('../models/View');

// Create a new view
router.post('/', async (req, res) => {
    try {
        const { name, description, owner, type, visibility } = req.body;

        const newView = new View({
            name,
            description,
            owner,
            type,
            visibility
        });

        const savedView = await newView.save();
        res.status(201).json(savedView);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get views for a user (simplified for now)
router.get('/:userId', async (req, res) => {
    try {
        const views = await View.find({ owner: req.params.userId }).sort({ createdAt: -1 });
        res.json(views);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update a view
router.put('/:id', async (req, res) => {
    try {
        const { name, description, type, visibility } = req.body;
        const updatedView = await View.findByIdAndUpdate(
            req.params.id,
            { name, description, type, visibility },
            { new: true }
        );
        if (!updatedView) return res.status(404).json({ message: 'View not found' });
        res.json(updatedView);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a view
router.delete('/:id', async (req, res) => {
    try {
        const deletedView = await View.findByIdAndDelete(req.params.id);
        if (!deletedView) return res.status(404).json({ message: 'View not found' });
        res.json({ message: 'View deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
