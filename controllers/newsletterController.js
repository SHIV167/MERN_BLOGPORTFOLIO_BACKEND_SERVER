const NewsletterPopup = require('../models/NewsletterPopup');

exports.getAllNewsletters = async (req, res) => {
  const items = await NewsletterPopup.find().sort({ createdAt: -1 });
  res.json(items);
};

exports.createNewsletter = async (req, res) => {
  const { title, backgroundBanner, enabled } = req.body;
  const newItem = new NewsletterPopup({ title, backgroundBanner, enabled });
  await newItem.save();
  res.status(201).json(newItem);
};

exports.updateNewsletter = async (req, res) => {
  const { id } = req.params;
  const { title, backgroundBanner, enabled } = req.body;
  const updated = await NewsletterPopup.findByIdAndUpdate(
    id,
    { title, backgroundBanner, enabled, updatedAt: Date.now() },
    { new: true }
  );
  res.json(updated);
};

exports.deleteNewsletter = async (req, res) => {
  const { id } = req.params;
  await NewsletterPopup.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};
