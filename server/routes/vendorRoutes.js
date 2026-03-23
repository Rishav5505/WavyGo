const express = require('express');
const router = express.Router();
const { getVendorProfile, updateVendorProfile } = require('../controllers/vendorController');
const { protect, seller } = require('../middleware/authMiddleware');

router.route('/profile')
    .get(protect, seller, getVendorProfile)
    .put(protect, seller, updateVendorProfile);

module.exports = router;
