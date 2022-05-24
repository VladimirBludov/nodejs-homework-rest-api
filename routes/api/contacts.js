const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { checkContact, validation, catchWrapper, auth } = require("../../middlewares");
const { joiAddSchema, joiUpdateSchema } = require("../../models/contact");

router.use("/:contactId", auth, checkContact);

router.get("/", auth, catchWrapper(ctrl.getAll));

router.get("/:contactId", catchWrapper(ctrl.getById));

router.post("/", auth, validation(joiAddSchema), catchWrapper(ctrl.add));

router.delete("/:contactId", catchWrapper(ctrl.remove));

router.put("/:contactId", validation(joiUpdateSchema), catchWrapper(ctrl.update));

router.patch("/:contactId/favorite", catchWrapper(ctrl.changeStatus));

module.exports = router;
