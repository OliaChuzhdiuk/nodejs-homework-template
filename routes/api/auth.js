const express = require("express");

const ctrl = require("../../controlles/auth");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user")


const router = express.Router();

router.post("/register", validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post("/login", validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.patch("/", authenticate, validationBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.subscription)
);


module.exports = router;