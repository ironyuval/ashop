import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name of a product'],
    trim: true,
    maxLength: [20, 'Product name not exceed than 20 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description of your product'],
    maxlength: [4000, 'Description is can not exceed than 4000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price for your product'],
    maxLength: [8, 'Price can not exceed than 8 characters'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please add a category of your product'],
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model('Product', productSchema);
