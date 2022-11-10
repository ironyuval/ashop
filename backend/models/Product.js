import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name of a product'],
    trim: true,
    maxLength: [20, 'Product name not exceed than 20 characters'],
  },
  /*   description: {
    type: String,
    required: [true, 'Please add a description of your product'],
    maxlength: [4000, 'Description is can not exceed than 4000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price for your product'],
    maxLength: [8, 'Price can not exceed than 8 characters'],
  }, */
  offerPrice: {
    type: String,
    maxLength: [4, 'Discount price can not exceed than 4 characters'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    /*     required: [true, 'Please add a category of your product'],
 */ },
  reviews: [
    {
      user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
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
