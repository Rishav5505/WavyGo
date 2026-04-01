const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Traveller'
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    city: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
