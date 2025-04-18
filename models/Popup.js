const mongoose = require('mongoose');

const PopupSchema = new mongoose.Schema({
  title: { type: String, required: false, default: '' },
  content: { type: String, required: false, default: '' },
  imageDesktop: { type: String, default: '' },
  imageMobile: { type: String, default: '' },
  enabledDesktop: { type: Boolean, default: false },
  enabledMobile: { type: Boolean, default: false },
  startDate: { type: Date },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Popup', PopupSchema);
