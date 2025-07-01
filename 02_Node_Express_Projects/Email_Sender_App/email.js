
require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
}); 

let mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'recipient@example.com',
  subject: '🚀 Test Email from Amrin',
  text: 'This is a secure test email sent using Node.js and Nodemailer with .env setup.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('❌ Error:', error);
  }
  console.log('✅ Email sent:', info.response);
});
