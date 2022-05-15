const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContactsController = async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json({ ...contact });
};

const addContactController = async (req, res) => {
  const response = await addContact(req.body);

  res.status(201).json({ ...response });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  const response = await removeContact(contactId);

  if (response?.error) {
    return res.status(500).json({ message: response.error.message });
  }

  res.status(200).json({ message: "contact deleted" });
};

const changeContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  const updatedContact = await updateContact(contactId, req.body);

  res.status(200).json({ ...updatedContact });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
};
