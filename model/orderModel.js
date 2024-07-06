const mongoose = require('mongoose');

const cartListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
},
prices: [{
    price: Number,
    size: String,
    quantity: Number
 }],
created_at: {
    type: Date,
    default: Date.now
},
updated_at: {
    type: Date,
    default: Date
}
});

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cartList: {
    type: [cartListSchema],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;