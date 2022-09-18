const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const bcrypt = require("bcrypt");

const gravatar = require("gravatar");

const { nanoid } = require("nanoid");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
      if (user) {
        throw RequestError(409, `User with such email:"${email}" already exists`);
      }
  
  const hashPassword = await bcrypt.hash(password, 10);
  const gravatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({ email, password: hashPassword, gravatarURL, verificationToken });
  const mail = {
    to: email,
    subject: "Postal address confirmation",
    html: `<a href="localhost:3000/api/users/verify/${verificationToken} target="_blank">Follow the link to verify your mailing address</a>`,
  };

   await sendEmail(mail);

   
    res.status(201).json({ email: result.email });

}

module.exports = register;