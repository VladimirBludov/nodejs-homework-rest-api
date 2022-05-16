const { ValidationError } = require("../helpers/errors");
const { Contact } = require("../models/contactModel");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId);
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({
    name,
    email,
    phone,
    favorite: favorite || false,
  });

  await contact.save();

  return contact;
};

const updateContact = async (contactId, { name, email, phone, favorite }) => {
  await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });

  const updatedContact = await getContactById(contactId);

  return updatedContact;
};

const updateStatusContact = async (contactId, { favorite }) => {
  if (favorite === undefined)
    throw new ValidationError("missing field favorite");

  await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });

  const updatedContact = await getContactById(contactId);

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
