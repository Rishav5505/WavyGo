const City = require('../models/cityModel');

// @desc    Get all cities
// @route   GET /api/cities
// @access  Public
const getCities = async (req, res) => {
    try {
        const cities = await City.find({}).sort('-createdAt');
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new city
// @route   POST /api/cities
// @access  Private/Admin
const addCity = async (req, res) => {
    try {
        const { name, image, description, isPopular } = req.body;
        const cityExists = await City.findOne({ name });
        if (cityExists) {
            return res.status(400).json({ message: 'City already exists' });
        }
        const city = await City.create({ name, image, description, isPopular });
        res.status(201).json(city);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a city
// @route   PUT /api/cities/:id
// @access  Private/Admin
const updateCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (city) {
            city.name = req.body.name || city.name;
            city.image = req.body.image || city.image;
            city.description = req.body.description || city.description;
            city.isActive = req.body.isActive !== undefined ? req.body.isActive : city.isActive;
            city.isPopular = req.body.isPopular !== undefined ? req.body.isPopular : city.isPopular;
            const updatedCity = await city.save();
            res.json(updatedCity);
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a city
// @route   DELETE /api/cities/:id
// @access  Private/Admin
const deleteCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (city) {
            await city.deleteOne();
            res.json({ message: 'City removed' });
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCities,
    addCity,
    updateCity,
    deleteCity
};
