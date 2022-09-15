const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationError } = require("../helpers");

const emailRegExp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
  },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const User = model("user", userSchema);

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema
};

module.exports = {
    User,
  schemas
};