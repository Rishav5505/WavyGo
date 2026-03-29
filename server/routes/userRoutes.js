const express = require('express');
const router = express.Router();
const { authUser, getUsers, deleteUser, getVendorStatsForAdmin, updateUserProfile, approveVendor, getUserProfile, sendOTP, verifyOTPAndRegister } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTPAndRegister);
router.route('/').get(protect, admin, getUsers);
router.get('/vendors-stats', protect, admin, getVendorStatsForAdmin);
router.route('/profile').put(protect, updateUserProfile);
router.route('/profile/:id').get(protect, getUserProfile);
router.route('/vendor/:id/approve').put(protect, admin, approveVendor);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
