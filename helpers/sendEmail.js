const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const RequestError = require("../helpers");

const { SEND_API_KEY, MY_EMAIL } = process.env;

sgMail.setApiKey(SEND_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: MY_EMAIL };
    await sgMail.send(email);
    return true;
  } catch (error) {
    return RequestError (500, "Failed to send email");
  }
};

module.exports = sendEmail;