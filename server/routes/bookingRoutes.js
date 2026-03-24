const express = require('express');
const router = express.Router();
const {
    addBookingItems,
    getBookings,
    getDashboardStats,
    updateBookingStatus,
    getMyBookings,
    getVendorBookings,
    getVendorStats,
    getAdminFinancials
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', addBookingItems);
router.get('/mybookings', protect, getMyBookings);
router.get('/vendor', protect, getVendorBookings);
router.get('/vendor-stats', protect, getVendorStats);
router.get('/stats', protect, admin, getDashboardStats);
router.get('/admin/financials', protect, admin, getAdminFinancials);
router.get('/', protect, admin, getBookings);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
