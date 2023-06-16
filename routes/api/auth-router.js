const express = require('express');
const authController = require('../../controllers/auth-controller');
const { validateBody } = require('../../decorators');
const { isBodyEmpty, authenticate } = require('../../middlewares/');
const schemas = require('../../schemas/users');

const authRouter = express.Router();

authRouter.post(
  '/register',
  isBodyEmpty,
  validateBody(schemas.userCheckSchema),
  authController.register
);

authRouter.post(
  '/login',
  isBodyEmpty,
  validateBody(schemas.userCheckSchema),
  authController.login
);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/logout', authenticate, authController.logout);

authRouter.patch('/', authenticate,isBodyEmpty, validateBody(schemas.subscriptionUpdateSchema), authController.updateSubscription)

module.exports = authRouter;
