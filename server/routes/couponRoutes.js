const express = require('express');
const router = express.Router();
const { 
    getCoupons, 
    createCoupon, 
    updateCoupon, 
    deleteCoupon, 
    applyCoupon 
} = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getCoupons) // Allow any logged in user to see active coupons
    .post(protect, admin, createCoupon);

router.post('/apply', protect, applyCoupon);

router.route('/:id')
    .put(protect, admin, updateCoupon)
    .delete(protect, admin, deleteCoupon);

module.exports = router;
