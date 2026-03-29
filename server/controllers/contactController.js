const { sendEmail } = require('../utils/email');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Send email to owner
        // You can change 'to' to whatever email receives the contact messages
        await sendEmail({
            to: process.env.ADMIN_EMAIL || 'rishavkumar33372@gmail.com',
            subject: `New Contact Message from ${name}`,
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #035c3e; text-align: center;">New Contact Request 📩</h2>
                    <div style="background-color: #f8fefc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                        <p style="margin: 0; font-weight: bold;">Message:</p>
                        <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="font-size: 12px; color: #777; margin-top: 40px; text-align: center;">Sent from WavyGo Contact Form</p>
                </div>
            `
        });

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Failed to send message, please try again later' });
    }
};

module.exports = { submitContactForm };
