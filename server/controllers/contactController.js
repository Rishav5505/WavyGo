const Contact = require('../models/contactModel');
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

        // 1. Save to database for admin view
        const newMessage = await Contact.create({ name, email, message });

        // 2. Send email to owner (Optional but good)
        try {
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
        } catch (emailError) {
            console.error('Failed to send contact email notification:', emailError);
        }

        res.status(200).json(newMessage);
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Failed to send message, please try again later' });
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find({}).sort('-createdAt');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update message status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateMessageStatus = async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);
        if (message) {
            message.status = req.body.status || message.status;
            const updatedMessage = await message.save();
            res.json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);
        if (message) {
            await message.deleteOne();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send reply to message
// @route   POST /api/contact/:id
// @access  Private/Admin
const sendReply = async (req, res) => {
    try {
        const { replyMessage } = req.body;
        const message = await Contact.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        if (!replyMessage) {
            return res.status(400).json({ message: 'Reply message is required' });
        }

        // Send email to user
        await sendEmail({
            to: message.email,
            subject: `Re: Your inquiry to WavyGo`,
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #035c3e; margin: 0;">WavyGo Support</h1>
                        <p style="color: #666; font-size: 14px;">Premium Bike Rentals</p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <p>Hi <strong>${message.name}</strong>,</p>
                        <p>Thank you for reaching out to us. Here is the response to your inquiry:</p>
                    </div>

                    <div style="background-color: #f8fefc; padding: 25px; border-radius: 15px; border-left: 5px solid #035c3e; margin-bottom: 30px;">
                        <p style="margin: 0; line-height: 1.6; color: #333;">${replyMessage}</p>
                    </div>

                    <div style="padding: 20px; background-color: #f9f9f9; border-radius: 10px; margin-bottom: 30px;">
                        <p style="margin: 0; font-size: 12px; color: #777;"><strong>Your original message:</strong></p>
                        <p style="margin: 10px 0 0; font-size: 13px; color: #555; font-style: italic;">"${message.message}"</p>
                    </div>

                    <div style="border-top: 1px solid #eee; pt-20; text-align: center;">
                        <p style="font-size: 14px; color: #333; margin-bottom: 5px;">Best regards,</p>
                        <p style="font-weight: bold; color: #035c3e; margin: 0;">The WavyGo Team</p>
                        <p style="font-size: 12px; color: #999; margin-top: 10px;">Visit us at <a href="https://wavygo.com" style="color: #035c3e;">wavygo.com</a></p>
                    </div>
                </div>
            `
        });

        // Mark as replied
        message.status = 'replied';
        await message.save();

        res.json({ message: 'Reply sent successfully' });
    } catch (error) {
        console.error('Reply Error:', error);
        res.status(500).json({ message: 'Failed to send reply' });
    }
};

module.exports = { 
    submitContactForm,
    getContactMessages,
    updateMessageStatus,
    deleteMessage,
    sendReply
};
