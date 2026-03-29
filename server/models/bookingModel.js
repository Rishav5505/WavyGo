const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vendorId: {
        type: String
    },
    vendorName: {
        type: String
    },
    itemTitle: {
        type: String
    },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelDate: { type: Date, required: true },
    guests: { type: Number, required: true },
    totalPrice: { type: Number, default: 0 },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Online', 'Wallet'],
        default: 'Cash'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'ongoing', 'completed', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
