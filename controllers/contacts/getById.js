const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await Contact.findOne({ _id: contactId, owner: userId });

  res.status(200).json(contact);
};

module.exports = getById;
