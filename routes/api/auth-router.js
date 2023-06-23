const express = require('express');
const authController = require('../../controllers/auth-controller');
const { validateBody } = require('../../decorators');
const { isBodyEmpty, authenticate, upload } = require('../../middlewares/');
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

authRouter.patch(
  '/',
  authenticate,
  isBodyEmpty,
  validateBody(schemas.subscriptionUpdateSchema),
  authController.updateSubscription
);

authRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatarURL'),
  authController.updateAvatar
);

module.exports = authRouter;
