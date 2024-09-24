const axios = require('axios');

// Set up your Elastic Email API key and sender information
const API_KEY = process.env.ELASTICMAIL_API_KEY;
const SENDER_EMAIL = 'mohd.aqib1418@gmail.com';

async function sendEmail(to, subject, bodyText, bodyHtml) {
  try {
    const response = await axios.post('https://api.elasticemail.com/v2/email/send', null, {
      params: {
        apikey: API_KEY,
        from: SENDER_EMAIL,
        to: 'mohd.aqib1418@gmail.com', //to
        subject,
        bodyText,
        bodyHtml,
        isTransactional: false
      }
    });

    if (response.data.success) {
      console.log('Email sent successfully:', response.data);
    } else {
      console.log('Failed to send email:', response.data.error);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail }

