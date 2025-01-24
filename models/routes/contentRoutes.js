const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Admin Panel to Add Content
router.get('/admin', (req, res) => {
    res.render('admin');
});

// Handle Content Submission
router.post('/add', async (req, res) => {
    try {
        const { title, description, imageURL } = req.body;
        const newContent = new Content({ title, description, imageURL });
        await newContent.save();
        res.redirect('/content/admin');
    } catch (err) {
        res.status(500).send("Error adding content.");
    }
});

// Display All Content on the Website
router.get('/all', async (req, res) => {
    try {
        const content = await Content.find();
        res.render('site-content', { content });
    } catch (err) {
        res.status(500).send("Error fetching content.");
    }
});

module.exports = router;
