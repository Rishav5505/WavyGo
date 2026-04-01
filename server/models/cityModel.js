const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String, // URL of the city cover image
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    bikeCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const City = mongoose.model('City', citySchema);

module.exports = City;
