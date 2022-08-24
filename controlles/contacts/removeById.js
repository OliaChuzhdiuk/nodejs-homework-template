const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const removeById = async (req, res, next) => {
  try {
      const { contactId } = req.params;
      const result = await contacts.updateContactById(contactId, req.body);
      if (!result) {
        throw RequestError(404, "Not found");
    }
      res.json(result);
  } catch (error) {
    next (error)
  }
};

module.exports = removeById;