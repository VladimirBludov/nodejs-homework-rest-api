const { Contact } = require("../../models");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  await Contact.findOneAndRemove({ _id: contactId, owner: userId });

  res.status(200).json({ message: "contact deleted" });
};

module.exports = remove;
