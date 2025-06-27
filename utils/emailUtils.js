const nodemailer = require("nodemailer");

const brevoTransporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// For inquiries (admin receives it)
const sendInquiryEmail = async (subject, htmlContent) => {
  const info = await brevoTransporter.sendMail({
from: `"Jai Travels Inquiry" <${process.env.FROM_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject,
    html: htmlContent
  });
  console.log("Inquiry Email sent:", info.messageId);
};

// For subscriptions (user receives it)
const sendSubscriptionEmail = async (subject, htmlContent, userEmail) => {
  const info = await brevoTransporter.sendMail({
    from: `"Jai Travels" <${process.env.FROM_EMAIL}>`,
    to: userEmail,
    subject,
    html: htmlContent
  });
  console.log("Subscription Email sent:", info.messageId);
};

module.exports = {
  sendInquiryEmail,
  sendSubscriptionEmail
};