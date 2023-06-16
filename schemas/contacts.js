const Joi = require('joi');
const { emailRegexp } = require('../constants/users');

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': 'missing required email field',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field',
  }),
  favorite: Joi.boolean(),
});

const contactUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing required favorite field',
  }),
});

module.exports = {
  contactAddSchema,
  contactUpdateStatusSchema,
};
