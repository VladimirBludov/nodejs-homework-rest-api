const { NotFound } = require("http-errors");
const { Contact } = require("../models");

const checkContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      next(new NotFound("Not found"));
    }
  } catch (error) {
    next(new NotFound("Not found"));
  }

  next();
};

module.exports = checkContact;
