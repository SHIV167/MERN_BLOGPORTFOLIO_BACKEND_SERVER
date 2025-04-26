const NewsletterPopup = require('../models/NewsletterPopup');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const nodemailer = require('nodemailer');

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

// List all newsletter subscribers
exports.getSubscribers = async (req, res) => {
  const subs = await NewsletterSubscriber.find().sort({ subscribedAt: -1 });
  res.json(subs);
};

// Send confirmation email upon subscription
exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  // Save subscriber to DB
  try {
    const subscriber = new NewsletterSubscriber({ email });
    await subscriber.save();
  } catch (err) {
    if (err.code !== 11000) {
      console.error('Subscriber save error', err);
      return res.status(500).json({ message: 'Database error' });
    }
  }
  // Configure mail transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || '465',
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
  // Send email
  await transporter.sendMail({
    from: `"Newsletter" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Subscription Confirmed',
    text: 'Thank you for subscribing to our newsletter!',
    html: '<p>Thank you for subscribing to our newsletter!</p>',
  });
  res.status(200).json({ message: 'Subscription successful' });
};
