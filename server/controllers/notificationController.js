const User = require('../models/userModel');
const { sendEmail } = require('../utils/email');

// @desc    Send notification (email) to users/vendors
// @route   POST /api/notifications/send
// @access  Private/Admin
const sendNotification = async (req, res) => {
    const { target, subject, message, customEmail } = req.body;

    try {
        let recipients = [];

        if (target === 'all_users') {
            const users = await User.find({ role: 'user' }).select('email');
            recipients = users.map(u => u.email);
        } else if (target === 'all_vendors') {
            const vendors = await User.find({ role: 'vendor' }).select('email');
            recipients = vendors.map(v => v.email);
        } else if (target === 'all') {
            const all = await User.find({}).select('email');
            recipients = all.map(a => a.email);
        } else if (target === 'custom' && customEmail) {
            recipients = [customEmail];
        }

        if (recipients.length === 0) {
            return res.status(400).json({ message: 'No recipients found' });
        }

        // Send emails
        // For production, this should be done with a queue or in chunks
        const emailPromises = recipients.map(email => 
            sendEmail({
                to: email,
                subject: subject,
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #0d9488;">WavyGo Notification</h2>
                        <div style="margin-top: 20px; line-height: 1.6;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #666;">
                            This is an automated notification from WavyGo. Please do not reply to this email.
                        </div>
                    </div>
                `
            })
        );

        await Promise.all(emailPromises);

        res.json({ message: `Successfully sent to ${recipients.length} recipients` });

    } catch (error) {
        console.error('Notification Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendNotification
};
