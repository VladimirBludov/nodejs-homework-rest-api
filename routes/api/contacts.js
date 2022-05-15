const express = require("express");
const router = express.Router();

const {
  addRequiredFieldsValidation,
  addOptionalFieldsValidation,
} = require("../../middlewares/validationMiddlewares");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
} = require("../../controllers/contactsController");

router.get("/", getContactsController);
router.get("/:contactId", getContactByIdController);
router.post("/", addRequiredFieldsValidation, addContactController);
router.delete("/:contactId", deleteContactController);
router.put("/:contactId", addOptionalFieldsValidation, changeContactController);

module.exports = router;
