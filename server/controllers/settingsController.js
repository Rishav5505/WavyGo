const Settings = require('../models/settingsModel');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({});
        if (!settings) {
            settings = await Settings.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({});
        if (!settings) {
            settings = new Settings({});
        }
        
        const { isMaintenanceMode, maintenanceMessage } = req.body;
        
        if (isMaintenanceMode !== undefined) settings.isMaintenanceMode = isMaintenanceMode;
        if (maintenanceMessage !== undefined) settings.maintenanceMessage = maintenanceMessage;
        settings.updatedBy = req.user._id;

        const updatedSettings = await settings.save();
        res.json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
