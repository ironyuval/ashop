import mongoose, { model, Types } from 'mongoose';
import { Permissions } from '../../frontend/src/server-shared/types';

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, 'Please provide a username!'],
  },

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
  },

  permission: {
    type: String,
    default: Permissions.User,
    required: [true, 'Please provide a permission!'],
  },

  image: {
    type: String,
  },

  wishlist: [{ type: Types.ObjectId, ref: 'Product' }],
  cart: [{ type: Types.ObjectId, ref: 'Product' }],
});

export default model('User', UserSchema);
