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
    
      description: {
        type: String,
        required: false,
      },
    
      price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0,
      },
    
      availability: {
        type: Boolean,
        default: true,
      },
    
      expiryDate: {
        type: Date,
        required: false,
      },
    
      images: [
         String
       
      ],
    
    });
    

const Product = mongoose.model('Product', productSchema);
export default Product;