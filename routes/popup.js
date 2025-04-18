const express = require('express');
const router = express.Router();
const { getPopup, createPopup, updatePopup, deletePopup, getAllPopups } = require('../controllers/popupController');

router.get('/', getPopup);
router.get('/all', getAllPopups);
router.post('/', createPopup);
router.put('/:id', updatePopup);
router.delete('/:id', deletePopup);

module.exports = router;
