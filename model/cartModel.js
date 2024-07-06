
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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

cartSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;