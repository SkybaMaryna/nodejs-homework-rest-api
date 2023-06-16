const express = require('express');
const contactsRouter = express.Router();
const contactsController = require('../../controllers/contacts-controller');
const schemas = require('../../schemas/contacts');
const { validateBody } = require('../../decorators');
const {
  isBodyEmpty,
  isValidId,
  isFavoritePass,
  authenticate,
} = require('../../middlewares/');

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:id', isValidId, contactsController.getById);

contactsRouter.post(
  '/',
  isBodyEmpty,
  validateBody(schemas.contactAddSchema),
  contactsController.add
);

contactsRouter.delete('/:id', isValidId, contactsController.deleteById);

contactsRouter.put(
  '/:id',
  isValidId,
  isBodyEmpty,
  validateBody(schemas.contactAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  isFavoritePass,
  validateBody(schemas.contactUpdateStatusSchema),
  contactsController.updateStatusContact
);

module.exports = contactsRouter;
