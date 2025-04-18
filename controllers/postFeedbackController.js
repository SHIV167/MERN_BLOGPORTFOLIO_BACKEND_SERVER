const PostFeedback = require('../models/PostFeedback');

// Add or increment feedback for a post
exports.addFeedback = async (req, res) => {
  const { postId, emoji } = req.body;
  if (!['like', 'love', 'wow'].includes(emoji)) return res.status(400).json({ message: 'Invalid emoji' });
  let feedback = await PostFeedback.findOne({ postId, emoji });
  if (!feedback) {
    feedback = await PostFeedback.create({ postId, emoji, count: 1 });
  } else {
    feedback.count += 1;
    await feedback.save();
  }
  res.json(feedback);
};

// Get feedback counts for a post
exports.getFeedback = async (req, res) => {
  const { postId } = req.params;
  const feedbacks = await PostFeedback.find({ postId });
  res.json(feedbacks);
};

// Get all feedback counts (for dashboard)
exports.getAllFeedback = async (req, res) => {
  const all = await PostFeedback.find();
  res.json(all);
};
