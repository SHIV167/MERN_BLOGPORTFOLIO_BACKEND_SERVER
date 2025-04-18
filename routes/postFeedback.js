const express = require('express');
const router = express.Router();
const { addFeedback, getFeedback, getAllFeedback } = require('../controllers/postFeedbackController');

// POST feedback
router.post('/', addFeedback);
// GET feedback for a post
router.get('/:postId', getFeedback);
// GET all feedback
router.get('/', getAllFeedback);

module.exports = router;
