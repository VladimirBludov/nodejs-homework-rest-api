const { BadRequest } = require("http-errors");
const { Contact } = require("../../models");

const changeStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: userId } = req.user;

  if (favorite === undefined) throw new BadRequest("missing field favorite");

  const updatedContact = await Contact.findOneAndUpdate(
    { owner: userId, _id: contactId },
    { $set: { favorite } },
    { new: true }
  );

  res.status(200).json(updatedContact);
};

module.exports = changeStatus;
