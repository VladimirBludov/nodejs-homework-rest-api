const { BadRequest, Unauthorized } = require("http-errors");
require("dotenv").config();
const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const retryVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest("missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("User not found");
  }

  const { verify, verificationToken } = user;

  if (verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const { PORT } = process.env;

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Confirm email</a>`,
  };

  await sendEmail(mail);

  res.json({ message: "Verification email sent" });
};

module.exports = retryVerifyEmail;
