const VendorProfile = require('../models/vendorProfileModel');

// @desc    Get vendor profile
// @route   GET /api/vendor/profile
// @access  Private/Vendor
const getVendorProfile = async (req, res) => {
    try {
        const profile = await VendorProfile.findOne({ vendorId: req.user._id });
        if (profile) {
            res.json(profile);
        } else {
            // Default profile for new vendors
            res.status(200).json({ 
                vendorId: req.user._id,
                businessName: "Ram Rentals",
                bankDetails: {
                    accountNo: "XXXXXXXXXXXX",
                    ifscCode: "IFSCXXXXXX",
                    accountHolder: req.user.name,
                    bankName: "State Bank"
                },
                policies: {
                    refundPolicy: "24-hour full refund applies on all bookings.",
                    termsAndConditions: "Standard rental terms apply.",
                    privacyPolicy: "We protect your business data."
                },
                aboutUs: "Professional bike rentals for all travelers.",
                contactDetails: {
                    phone: "+91 XXXXXXXXXX",
                    email: req.user.email,
                    address: "Main Street, Market Area"
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update vendor profile
// @route   PUT /api/vendor/profile
// @access  Private/Vendor
const updateVendorProfile = async (req, res) => {
    try {
        const { 
            businessName, bankDetails, documents, 
            businessTiming, policies, aboutUs, 
            contactDetails, socialLinks 
        } = req.body;

        let profile = await VendorProfile.findOne({ vendorId: req.user._id });

        if (profile) {
            // Update existing profile
            profile = await VendorProfile.findOneAndUpdate(
                { vendorId: req.user._id },
                {
                    businessName,
                    bankDetails,
                    documents,
                    businessTiming,
                    policies,
                    aboutUs,
                    contactDetails,
                    socialLinks
                },
                { new: true }
            );
        } else {
            // Create new profile
            profile = await VendorProfile.create({
                vendorId: req.user._id,
                businessName,
                bankDetails,
                documents,
                businessTiming,
                policies,
                aboutUs,
                contactDetails,
                socialLinks
            });
        }
        res.json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getVendorProfile, updateVendorProfile };
