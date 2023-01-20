import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title of a product'],
    trim: true,
    maxLength: [20, 'Product title not exceed than 20 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description of your product'],
    trim: true,
    maxlength: [100, 'Description exceeded characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price for your product'],
    min: 0,
    max: 100,
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
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
