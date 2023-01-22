import mongoose, { model, Types } from 'mongoose';
import { Permissions } from '../../frontend/src/server-shared/types';

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
  },

  permission: {
    type: String,
    enum: Object.values(Permissions),
    default: Permissions.Registered,
    required: [true, 'Please provide a permission!'],
  },

  image: {
    type: String,
  },

  wishlist: [{ type: Types.ObjectId, ref: 'Product' }],

  cart: [{ type: Types.ObjectId, ref: 'Product' }],
});

export default model('User', UserSchema);
