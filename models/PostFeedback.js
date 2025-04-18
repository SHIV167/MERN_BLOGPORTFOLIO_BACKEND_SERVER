const mongoose = require('mongoose');

const PostFeedbackSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  emoji: { type: String, enum: ['like', 'love', 'wow'], required: true },
  count: { type: Number, default: 0 }
});

module.exports = mongoose.model('PostFeedback', PostFeedbackSchema);
