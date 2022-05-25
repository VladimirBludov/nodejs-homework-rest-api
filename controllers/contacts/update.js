const { Contact } = require("../../models");

const update = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const updatedContact = await Contact.findOneAndUpdate(
    { owner: userId, _id: contactId },
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updatedContact);
};

module.exports = update;
