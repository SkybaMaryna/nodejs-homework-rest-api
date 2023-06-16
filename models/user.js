const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const { emailRegexp } = require('../constants/users');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema)

module.exports = User;
