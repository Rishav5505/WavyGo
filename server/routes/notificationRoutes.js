const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controllers/notificationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/send', protect, admin, sendNotification);

module.exports = router;
