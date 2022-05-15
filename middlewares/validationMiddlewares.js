const Joi = require("joi");

const schemaRequiredFields = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().required(),
});

const schemaOptionalFields = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const addRequiredFieldsValidation = (req, res, next) => {
  const validationResult = schemaRequiredFields.validate(req.body);

  if (validationResult?.error) {
    return res.status(400).json({ message: validationResult.error.message });
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

module.exports = {
  addRequiredFieldsValidation,
  addOptionalFieldsValidation,
};
