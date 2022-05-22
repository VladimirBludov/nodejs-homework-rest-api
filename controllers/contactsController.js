const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const contact = await addContact(req.body);

  res.status(201).json(contact);
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  await removeContact(contactId);

  res.status(200).json({ message: "contact deleted" });
};

const changeContactController = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await updateContact(contactId, req.body);

  res.status(200).json(updatedContact);
};

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await updateStatusContact(contactId, req.body);

  res.status(200).json(updatedContact);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateStatusContactController,
};
