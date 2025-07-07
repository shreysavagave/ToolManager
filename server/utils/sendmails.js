const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "helpconnect009@gmail.com", 
    pass: "fnliolrjvbhsbade",           
  },
});

const sendEmail = async (to, subject, message) => {
  try {
    await transporter.sendMail({
      from: '"Tool Manager" <your-email@gmail.com>',
      to,
      subject,
      text: message,
    });
    console.log("Email sent to", to);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};

module.exports = sendEmail;
