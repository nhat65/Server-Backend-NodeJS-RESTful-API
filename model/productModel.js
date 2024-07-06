const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
});

const categorySchema = new mongoose.Schema({
    category: {
        type: String
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
    ],
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagelink_square: {
        type: String
    },
    imagelink_portrait: {
        type: String
    },
    ingredients: {
        type: String
    },
    special_ingredient:{
         type: String
    },
    average_rating: {
          type: Number
    },
    ratings_count: {
        type: Number
    },
    prices: [{
       price: Number,
       size: String
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date
      }
    });
    
    productSchema.pre('save', function(next) {
      this.updated_at = new Date();
      next();
    });

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = { Product, Category};