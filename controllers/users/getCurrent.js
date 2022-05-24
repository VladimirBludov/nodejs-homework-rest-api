const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findById(userId);

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = getCurrent;
