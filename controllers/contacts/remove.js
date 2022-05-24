const { Contact } = require("../../models");

const remove = async (req, res) => {
  const { contactId } = req.params;

  await Contact.findByIdAndRemove(contactId);

  res.status(200).json({ message: "contact deleted" });
};

module.exports = remove;
