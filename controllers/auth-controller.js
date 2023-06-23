const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ctrlWrapper } = require('../decorators');
const { HttpError } = require('../helpers');
const { SECRET_KEY } = process.env;
const gravatar = require('gravatar');
const fs = require('fs/promises');
const Jimp = require('jimp');
const path = require('path');

const avatarDir = path.resolve('public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const userAvatar = gravatar.url(email, { s: '250', d: '404' }, false);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: userAvatar,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: 'starter',
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const { _id: id, subscription } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json({
    message: 'Logout success',
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.json({
    message: 'Update success',
  });
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;

  await Jimp.read(oldPath)
    .then(avatar => {
      return avatar.resize(250, 250).write(oldPath);
    })
    .catch(err => {
      console.error(err);
    });

  const newPath = path.join(avatarDir, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join('avatars', filename);
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
