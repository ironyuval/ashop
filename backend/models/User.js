import mongoose, { model } from 'mongoose';
import { UserTypes } from '../utils/types';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email Exist'],
  },

  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    unique: false,
  },

  type: {
    type: Number,
    default: UserTypes.User,
    required: [true, 'Please provide a type!'],
  },
});

export default model('User', UserSchema);
