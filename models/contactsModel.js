const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationError } = require("../helpers");

const contactSchema = Schema({
  name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
  email: {
      type: String,
    },
  phone: {
      type: String,
    },
  favorite: {
      type: Boolean,
      default: false,
  },
  owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
    
});

contactSchema.post("save", handleSchemaValidationError);

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const Contact = model("contact", contactSchema);


const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  joiContactSchema,
  updateFavoriteSchema
};

module.exports = {
  Contact,
  schemas,
}