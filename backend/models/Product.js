import { Schema, model } from 'mongoose';
import { Genres } from '../../frontend/src/server-shared/types';

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title of a product'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description of your product'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add a price for your product'],
    min: 0,
    max: 100,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  images: [
    {
      _id: false,
      url: {
        type: String,
      },
    },
  ],
  genre: {
    type: String,
    enum: Object.keys(Genres),
    required: [true, 'Please add a genre'],
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model('Product', productSchema);
