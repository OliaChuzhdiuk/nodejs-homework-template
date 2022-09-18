const express = require("express");

const ctrl = require("../../controlles/auth");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user")


const router = express.Router();

router.post("/register", validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post("/login", validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.get("/avatar", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify",validationBody(schemas.verifyEmailSchema),ctrlWrapper(ctrl.resendVerificationEmail));

router.patch("/", authenticate, validationBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.subscription));





module.exports = router;
