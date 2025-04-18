const mongoose = require('mongoose');

const HeaderMenuSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
  config: { type: mongoose.Schema.Types.Mixed }, // for extra settings
}, { timestamps: true });

module.exports = mongoose.model('HeaderMenu', HeaderMenuSchema);
