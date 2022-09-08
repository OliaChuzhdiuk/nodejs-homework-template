const { Contact } = require("../../models/contactsModel");

const { RequestError } = require("../../helpers");

const updateById = async (req, res, next) => {
  try {
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
      if (!result) {
        throw RequestError(404, "Not found");
    }
      res.json(result);
  } catch (error) {
    next (error)
  }
};

module.exports = updateById;