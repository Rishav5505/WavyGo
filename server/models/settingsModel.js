const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    isMaintenanceMode: {
        type: Boolean,
        default: false
    },
    maintenanceMessage: {
        type: String,
        default: 'Our website is currently undergoing scheduled maintenance. We will be back soon!'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
