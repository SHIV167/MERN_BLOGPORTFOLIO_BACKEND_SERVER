const Popup = require('../models/Popup');

exports.getPopup = async (req, res) => {
  // Only return popups that are enabled and within schedule for current device
  const now = new Date();
  const isMobile = req.headers['user-agent'] && /mobile/i.test(req.headers['user-agent']);
  const popups = await Popup.find({
    $or: [
      { enabledDesktop: true },
      { enabledMobile: true }
    ],
    $and: [
      { $or: [ { startDate: { $exists: false } }, { startDate: { $lte: now } } ] },
      { $or: [ { endDate: { $exists: false } }, { endDate: { $gte: now } } ] }
    ]
  });
  // Filter for device
  const filtered = popups.filter(p => isMobile ? p.enabledMobile : p.enabledDesktop);
  res.json(filtered);
};

exports.createPopup = async (req, res) => {
  const { title, content, imageDesktop, imageMobile, enabledDesktop, enabledMobile, startDate, endDate } = req.body;
  const popup = new Popup({ title, content, imageDesktop, imageMobile, enabledDesktop, enabledMobile, startDate, endDate });
  await popup.save();
  res.status(201).json(popup);
};

exports.updatePopup = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageDesktop, imageMobile, enabledDesktop, enabledMobile, startDate, endDate } = req.body;
  const popup = await Popup.findByIdAndUpdate(id, { title, content, imageDesktop, imageMobile, enabledDesktop, enabledMobile, startDate, endDate, updatedAt: Date.now() }, { new: true });
  res.json(popup);
};

exports.deletePopup = async (req, res) => {
  const { id } = req.params;
  await Popup.findByIdAndDelete(id);
  res.json({ message: 'Popup deleted' });
};

// For dashboard: get all popups
exports.getAllPopups = async (req, res) => {
  const popups = await Popup.find().sort({ createdAt: -1 });
  res.json(popups);
};
