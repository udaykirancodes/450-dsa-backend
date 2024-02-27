const nodemailer = require("nodemailer");

const config = require("../config/config");
const { ApiError } = require("./ApiError");
const { ApiResponse } = require("./ApiResponse");
const {
  getHtmlTemplateForVerification,
  getHtmlTemplateForPasswordReset,
} = require("./htmlTemplate");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL.ID,
    pass: config.EMAIL.PASS,
  },
});
// Send Email
// res , to , subject , html
const sendEmail = async (res, to_email, subject_to, html_to) => {
  let mailOptions = {
    from: config.EMAIL.ID,
    to: to_email,
    subject: subject_to,
    html: html_to,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err.message);
      res.status(400).json(new ApiError(400, [], "Error in sending email"));
    } else {
      res
        .status(200)
        .json(new ApiResponse(200, null, "Email sent successfully"));
    }
  });
};

// send email to verify a user
const sendVerificationEmail = async (res, name, email, token) => {
  const url = config.FRONTEND_URL + "/verify-email?token=" + token;
  const htmlTemplate = getHtmlTemplateForVerification(name, url);
  return sendEmail(res, email, "Email Verification @450DSA.COM", htmlTemplate);
};
// send password reset email
const sendPasswordResetEmail = async (res, name, email, token) => {
  const url = config.FRONTEND_URL + "/reset-password/" + token;
  const htmlTemplate = getHtmlTemplateForPasswordReset(name, url);
  return sendEmail(res, email, "Password Reset @450DSA.COM", htmlTemplate);
};
module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
