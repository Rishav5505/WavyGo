const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUsers, deleteUser, getVendorStatsForAdmin, updateUserProfile } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.get('/vendors-stats', protect, admin, getVendorStatsForAdmin);
router.route('/profile').put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
