const express = require('express');
const contactsRouter = express.Router();
const contactsController = require('../../controllers/contacts-controller');
const schemas = require('../../schemas/contacts');
const { validateBody } = require('../../decorators');

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', contactsController.getById);

contactsRouter.post(
  '/',
  validateBody(schemas.contactAddSchema),
  contactsController.add
);

contactsRouter.delete('/:id', contactsController.deleteById);

contactsRouter.put(
  '/:id',
  validateBody(schemas.contactUpdateSchema),
  contactsController.updateById
);

module.exports = contactsRouter;
