const { BadRequest } = require("http-errors");
const { Contact } = require("../../models");

const changeStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) throw new BadRequest("missing field favorite");

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    { new: true }
  );

  res.status(200).json(updatedContact);
};

module.exports = changeStatus;
