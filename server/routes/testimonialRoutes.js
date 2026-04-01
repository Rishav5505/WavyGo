const express = require('express');
const router = express.Router();
const { 
    getTestimonials, 
    getAllTestimonialsAdmin, 
    createTestimonial, 
    updateTestimonial, 
    deleteTestimonial 
} = require('../controllers/testimonialController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getTestimonials).post(protect, admin, createTestimonial);

router.get('/admin', protect, admin, getAllTestimonialsAdmin);

router.route('/:id')
    .put(protect, admin, updateTestimonial)
    .delete(protect, admin, deleteTestimonial);

module.exports = router;
