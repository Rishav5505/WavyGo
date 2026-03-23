const mongoose = require('mongoose');

const vendorProfileSchema = mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    businessName: { type: String },
    bankDetails: {
        accountNo: String,
        ifscCode: String,
        accountHolder: String,
        bankName: String
    },
    documents: {
        businessDocs: [String], // URLs/Paths
        ownerDocs: [String]
    },
    businessTiming: {
        open: { type: String, default: "09:00" },
        close: { type: String, default: "21:00" },
        days: { type: [String], default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }
    },
    policies: {
        refundPolicy: { type: String, default: "Standard 24h refund policy applies." },
        termsAndConditions: { type: String, default: "Generic terms and conditions for WavyGo vendors." },
        privacyPolicy: { type: String, default: "Your data is safe with us." }
    },
    aboutUs: { type: String, default: "Helping riders explore the mountains with ease." },
    contactDetails: {
        phone: String,
        email: String,
        address: String
    },
    socialLinks: {
        shareUrl: String
    },
    averageRating: { type: Number, default: 0 },
    ratings: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

const VendorProfile = mongoose.model('VendorProfile', vendorProfileSchema);
module.exports = VendorProfile;
