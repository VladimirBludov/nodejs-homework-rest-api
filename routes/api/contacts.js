const express = require("express");
const router = express.Router();

const {
  addRequiredFieldsValidation,
  addOptionalFieldsValidation,
  addCheckContactValidation,
} = require("../../middlewares/validationMiddlewares");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");
const { catchWrapper } = require("../../helpers/apiHelpers");

router.use("/:contactId", addCheckContactValidation);

router.get("/", catchWrapper(getContactsController));

router.get("/:contactId", catchWrapper(getContactByIdController));

router.post(
  "/",
  addRequiredFieldsValidation,
  catchWrapper(addContactController)
);

router.delete("/:contactId", catchWrapper(deleteContactController));

router.put(
  "/:contactId",
  addOptionalFieldsValidation,
  catchWrapper(changeContactController)
);

router.patch(
  "/:contactId/favorite",
  catchWrapper(updateStatusContactController)
);

module.exports = router;
