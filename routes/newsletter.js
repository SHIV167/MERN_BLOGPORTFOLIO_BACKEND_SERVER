const express = require('express');
const router = express.Router();
const {
  getAllNewsletters,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
} = require('../controllers/newsletterController');

// Dashboard: list all newsletter popups
router.get('/all', getAllNewsletters);
// Create a new newsletter popup
router.post('/', createNewsletter);
// Update an existing popup
router.put('/:id', updateNewsletter);
// Delete a popup
router.delete('/:id', deleteNewsletter);

module.exports = router;
