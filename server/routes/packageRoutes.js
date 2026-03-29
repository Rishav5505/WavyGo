const express = require('express');
const router = express.Router();
const { 
    getPackages, 
    getPackageById, 
    createPackage, 
    updatePackage, 
    deletePackage, 
    getCategoryStats,
    getVendorPackagesForAdmin
} = require('../controllers/packageController');
const { protect, admin, seller } = require('../middleware/authMiddleware');

router.get('/', getPackages);
router.get('/category-stats', protect, admin, getCategoryStats);
router.get('/vendor/:vendorId', protect, admin, getVendorPackagesForAdmin);
router.get('/:id', getPackageById);
router.post('/', protect, seller, createPackage);
router.put('/:id', protect, seller, updatePackage);
router.delete('/:id', protect, seller, deletePackage);

module.exports = router;
