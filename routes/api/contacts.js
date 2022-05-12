const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addRequiredFieldsValidation,
  addOptionalFieldsValidation,
} = require("../../middlewares/validationMiddlewares");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json({ ...contact });
});

router.post("/", addRequiredFieldsValidation, async (req, res) => {
  const response = await addContact(req.body);

  res.status(201).json({ ...response });
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  const { error } = await removeContact(contactId);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", addOptionalFieldsValidation, async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  const updatedContact = await updateContact(contactId, req.body);

  res.status(200).json({ ...updatedContact });
});

module.exports = router;
