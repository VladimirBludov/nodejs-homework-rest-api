const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
require("dotenv").config();
const { Conflict } = require("http-errors");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signUp = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const newUser = new User({ email, subscription, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const { PORT } = process.env;

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({ user: { email, subscription, verificationToken } });
};

module.exports = signUp;
