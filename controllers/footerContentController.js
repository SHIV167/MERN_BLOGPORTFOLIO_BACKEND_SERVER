const FooterContent = require('../models/FooterContent');

// Get footer content
exports.getFooter = async (req, res) => {
  try {
    let footer = await FooterContent.findOne();
    if (!footer) {
      footer = await FooterContent.create({});
    }
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update footer content
exports.updateFooter = async (req, res) => {
  try {
    let footer = await FooterContent.findOne();
    if (!footer) {
      footer = await FooterContent.create({});
    }
    footer.text = req.body.text;
    footer.links = req.body.links;
    footer.social = req.body.social;
    await footer.save();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
