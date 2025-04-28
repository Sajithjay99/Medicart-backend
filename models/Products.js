import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },

  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Adult Care',
      'Beauty Accessories',
      'Beverages',
      'Cosmetics',
      'Dairy Products',
      'Kids',
      'Mother & Baby Care',
      'Personal Care',
      'Pet Care',
      'Skin Care',
      'Surgical Items',
      'Vitamins & Nutritions',
      'Others',
    ],
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },

  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
  },

  description: {
    type: String,
    required: false,
  },

  availability: {
    type: Boolean,
    default: true,
  },

  dateAdded: {
    type: Date,
    default: Date.now,
  },

  images: [
    String
  ],
});

const Product = mongoose.model('Product', productSchema);
export default Product;
