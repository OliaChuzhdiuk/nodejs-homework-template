const { User } = require("../../models/user");

const subscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({
    message: `current user subscription is changed to: ${subscription}`,
  });
};

module.exports = subscription;