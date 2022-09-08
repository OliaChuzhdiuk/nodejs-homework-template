const { Contact, schemas } = require("../../models/contactsModel");


const add = async (req, res, next) => {
  try {
    const { error } = schemas.validate(req.body);
     if (error) {
       throw RequestError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
};

module.exports = add;