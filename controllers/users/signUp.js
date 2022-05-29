const gravatar = require("gravatar");
const { Conflict } = require("http-errors");
const { User } = require("../../models");

const signUp = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email);

  const newUser = new User({ email, subscription, avatarURL });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({ user: { email, subscription } });
};

module.exports = signUp;
