const express = require('express');
const router = express.Router();
const { getPackages, getPackageById, createPackage, updatePackage, deletePackage, getCategoryStats } = require('../controllers/packageController');
const { protect, seller, admin } = require('../middleware/authMiddleware');

router.get('/', getPackages);
router.get('/category-stats', protect, admin, getCategoryStats);
router.get('/:id', getPackageById);
router.post('/', protect, seller, createPackage);
router.put('/:id', protect, seller, updatePackage);
router.delete('/:id', protect, seller, deletePackage);

module.exports = router;
