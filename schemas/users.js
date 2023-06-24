const Joi = require('joi');
const { emailRegexp, subscriptionList } = require('../constants/users');

const userCheckSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': 'missing required email field',
  }),
  password: Joi.string().required().messages({
    'any.required': 'missing required password field',
  }),
  subscription: Joi.string().valid(...subscriptionList),
  token: Joi.string(),
  avatarURL: Joi.string(),
});

const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required()
    .messages({
      'any.required': 'missing required subscription field',
    }),
});

module.exports = {
  userCheckSchema,
  subscriptionUpdateSchema,
};
