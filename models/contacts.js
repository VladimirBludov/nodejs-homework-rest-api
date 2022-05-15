const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./contacts.json");
const UNICODE = "utf8";

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, UNICODE);
    return JSON.parse(contacts);
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  return contacts.find((contact) => contact.id === String(contactId));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== String(contactId)
  );

  try {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), UNICODE);
  } catch (error) {
    return { error: { message: error.message } };
  }
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts), UNICODE);
    return newContact;
  } catch (error) {
    return { error: { message: error.message } };
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();

  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = name || contact.name;
      contact.email = email || contact.email;
      contact.phone = phone || contact.phone;
    }
  });

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts), UNICODE);
    const updatedContact = await getContactById(contactId);
    return { ...updatedContact };
  } catch (error) {
    return { error: { message: error.message } };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
