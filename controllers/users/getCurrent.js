const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email: email,
    subscription: subscription,
  });
};

module.exports = getCurrent;
