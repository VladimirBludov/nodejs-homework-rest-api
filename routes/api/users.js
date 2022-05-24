const express = require("express");
const { users: ctrl } = require("../../controllers");
const { validation, catchWrapper, auth } = require("../../middlewares");
const { joiSchema, joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), catchWrapper(ctrl.signUp));
router.post("/login", validation(joiSchema), catchWrapper(ctrl.login));
router.get("/logout", auth, catchWrapper(ctrl.logout));
router.get("/current", auth, catchWrapper(ctrl.getCurrent));
router.patch("/", auth, validation(joiSubscriptionSchema), catchWrapper(ctrl.updateSubscription));

module.exports = router;
