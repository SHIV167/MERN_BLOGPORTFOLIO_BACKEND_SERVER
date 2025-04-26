const mongoose = require('mongoose');

const NewsletterPopupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    backgroundBanner: { type: String },
    enabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NewsletterPopup', NewsletterPopupSchema);
