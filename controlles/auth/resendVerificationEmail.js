const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Not found");
  }
  if (user.verify) {
    throw RequestError(404, "User already verify");
  }

  const mail = {
    to: email,
    subject: "Postal address verification",
    html: `<a href="localhost:3001/api/users/verify/${user.verificationToken} target="_blank">Follow the link to verify your mailing address</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Email verify resent",
  });
};

module.exports = resendVerificationEmail;