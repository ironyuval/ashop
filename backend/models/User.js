import mongoose, { model, Types } from 'mongoose';
import { UserType } from '../utils/types';

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Please provide a name!'],
  },

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
    default: UserType.User,
    required: [true, 'Please provide a type!'],
  },

  image: {
    type: String,
  },

  favorites: [{ type: Types.ObjectId, ref: 'Product' }],
});

export default model('User', UserSchema);
