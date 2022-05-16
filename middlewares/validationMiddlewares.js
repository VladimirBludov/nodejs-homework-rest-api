const Joi = require("joi");
const { ValidationError, WrongParametersError } = require("../helpers/errors");
const { getContactById } = require("../services/contactsService");

const schemaRequiredFields = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const schemaOptionalFields = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone", "favorite");

const addRequiredFieldsValidation = (req, res, next) => {
  const validationResult = schemaRequiredFields.validate(req.body);

  if (validationResult?.error) {
    next(new ValidationError(validationResult.error.message));
  }

  next();
};

const addOptionalFieldsValidation = (req, res, next) => {
  const validationResult = schemaOptionalFields.validate(req.body);

  if (validationResult?.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }

  next();
};

const addCheckContactValidation = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) next(new WrongParametersError("Not found"));
  } catch (error) {
    next(new WrongParametersError("Not found"));
  }

  next();
};

module.exports = {
  addRequiredFieldsValidation,
  addOptionalFieldsValidation,
  addCheckContactValidation,
};
