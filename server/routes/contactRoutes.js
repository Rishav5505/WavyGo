const express = require('express');
const router = express.Router();
const { 
    submitContactForm, 
    getContactMessages, 
    updateMessageStatus, 
    deleteMessage,
    sendReply
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
      .post(submitContactForm)
      .get(protect, admin, getContactMessages);

router.route('/:id')
      .put(protect, admin, updateMessageStatus)
      .delete(protect, admin, deleteMessage)
      .post(protect, admin, sendReply);

module.exports = router;
