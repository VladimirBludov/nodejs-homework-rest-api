const { BadRequest } = require("http-errors");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription } = req.body;

  if (!subscription) {
    throw new BadRequest("missing field subscription");
  }

  const user = await User.findByIdAndUpdate(userId, { subscription }, { new: true });

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = updateSubscription;
