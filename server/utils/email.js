const axios = require('axios');

const sendEmail = async ({ to, subject, htmlContent }) => {
    try {
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: {
                name: process.env.BREVO_SENDER_NAME || 'WavyGo',
                email: process.env.BREVO_SENDER_EMAIL || 'rishavkumar33372@gmail.com'
            },
            to: [{ email: to }],
            subject,
            htmlContent
        }, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending email through Brevo:', error.response ? error.response.data : error.message);
        throw new Error('Failed to send email');
    }
};

module.exports = { sendEmail };
