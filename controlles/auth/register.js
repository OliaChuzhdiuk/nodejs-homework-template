const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const bcrypt = require("bcrypt");

const gravatar = require("gravatar");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
      if (user) {
        throw RequestError(409, `User with such email:"${email}" already exists`);
      }
  
  const hashPassword = await bcrypt.hash(password, 10);
  const gravatarURL = gravatar.url(email);
    const result = await User.create({ email, password: hashPassword, gravatarURL});
    res.status(201).json({ email: result.email });

}

module.exports = register;