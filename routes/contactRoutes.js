const express = require('express');
const router = express.Router();
const sendEmail = require('../config/emailConfig');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/authMiddleware');

// @route   POST api/contact
// @desc    Send contact form message
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const contactMessage = new Contact({
      name,
      email,
      subject,
      message
    });
    await contactMessage.save();

    // Send email to admin
    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Message: ${subject || 'No Subject'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `
    });

    // Send confirmation email to user
    const userEmailResult = await sendEmail({
      to: email,
      subject: 'Thank you for contacting us',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <hr>
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Best regards,</p>
        <p>Shiv Jha</p>
      `
    });

    if (!adminEmailResult.success || !userEmailResult.success) {
      throw new Error('Failed to send email');
    }

    res.json({ 
      success: true, 
      message: 'Message received successfully. Check your email for confirmation.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// @route   GET api/contact/test
// @desc    Test route to get all messages without auth
// @access  Public (temporary)
router.get('/test', async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/contact
// @desc    Get all contact messages
// @access  Private (Admin only)
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/contact/:id/status
// @desc    Update message status (unread/read/replied)
// @access  Private (Admin only)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/contact/:id
// @desc    Delete a message
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
