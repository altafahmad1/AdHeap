require('dotenv').config();
const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  service: 'gmail',
        auth: {
          user: 'noreply.adheap@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
});


