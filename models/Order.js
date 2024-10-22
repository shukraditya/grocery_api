const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
