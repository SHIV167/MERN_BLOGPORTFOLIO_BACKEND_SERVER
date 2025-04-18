const mongoose = require('mongoose');

const FooterContentSchema = new mongoose.Schema({
  text: { type: String, default: '' },
  links: [
    {
      label: { type: String, default: '' },
      url: { type: String, default: '' }
    }
  ],
  social: [
    {
      icon: { type: String, default: '' }, // e.g., 'FaTwitter'
      url: { type: String, default: '' }
    }
  ]
});

module.exports = mongoose.model('FooterContent', FooterContentSchema);
