const express = require('express');
const router = express.Router();
const { getFooter, updateFooter } = require('../controllers/footerContentController');

// GET footer content
router.get('/', getFooter);

// PUT update footer content
router.put('/', updateFooter);

module.exports = router;
