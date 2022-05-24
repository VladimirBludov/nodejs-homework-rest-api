const { Contact } = require("../../models");

const update = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updatedContact);
};

module.exports = update;
