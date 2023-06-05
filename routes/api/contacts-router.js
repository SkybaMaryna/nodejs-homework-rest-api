const express = require('express');
const contactsRouter = express.Router();
const contactsController = require('../../controllers/contacts-controller');
const schemas = require('../../schemas/contacts');
const { validateBody } = require('../../decorators');
const { HttpError } = require('../../helpers');

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', contactsController.getById);

contactsRouter.post(
  '/',
  validateBody(schemas.contactAddSchema),
  contactsController.add
);

contactsRouter.delete('/:id', contactsController.deleteById);

contactsRouter.use((req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, 'missing fields');
    }
  } catch (error) {
    next(error)
  }
  next()
});

contactsRouter.put(
  '/:id',
  validateBody(schemas.contactAddSchema),
  contactsController.updateById
);

module.exports = contactsRouter;
