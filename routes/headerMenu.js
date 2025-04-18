const express = require('express');
const router = express.Router();
const headerMenuController = require('../controllers/headerMenuController');

// CRUD routes
router.post('/', headerMenuController.createMenu);
router.get('/', headerMenuController.getMenus);
router.put('/:id', headerMenuController.updateMenu);
router.delete('/:id', headerMenuController.deleteMenu);

module.exports = router;
