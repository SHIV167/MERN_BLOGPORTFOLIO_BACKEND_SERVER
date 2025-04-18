const HeaderMenu = require('../models/HeaderMenu');

// Create
exports.createMenu = async (req, res) => {
  try {
    const menu = new HeaderMenu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.getMenus = async (req, res) => {
  try {
    const menus = await HeaderMenu.find().sort({ order: 1 });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateMenu = async (req, res) => {
  try {
    const menu = await HeaderMenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menu) return res.status(404).json({ error: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await HeaderMenu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ error: 'Menu not found' });
    res.json({ message: 'Menu deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
