const Package = require('../models/packageModel');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find({});
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get package by ID
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (package) {
            res.json(package);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a package
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = async (req, res) => {
    console.log('--- CREATE PACKAGE REQUEST ---');
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('User:', req.user);
    try {
        const { title, description, location, price, duration, image, category, images, itinerary, inclusions, exclusions, isFeatured, vendorName, vendorId, specs, rating } = req.body;
        const package = new Package({
            title,
            description: description || title,
            location,
            price,
            duration,
            image,
            category,
            images,
            itinerary,
            inclusions,
            exclusions,
            isFeatured,
            vendorName,
            vendorId,
            specs,
            rating: rating || 0
        });
        const createdPackage = await package.save();
        res.status(201).json(createdPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (package) {
            Object.assign(package, req.body);
            const updatedPackage = await package.save();
            res.json(updatedPackage);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (package) {
            await package.deleteOne();
            res.json({ message: 'Package removed' });
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get category stats for dashboard
// @route   GET /api/packages/category-stats
// @access  Private/Admin
const getCategoryStats = async (req, res) => {
    try {
        const stats = await Package.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);
        const total = await Package.countDocuments();
        
        const formattedStats = stats.map(s => ({
            label: s._id || 'Others',
            value: total > 0 ? Math.round((s.count / total) * 100) : 0,
            count: s.count
        }));
        
        res.json(formattedStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPackages, getPackageById, createPackage, updatePackage, deletePackage, getCategoryStats };
