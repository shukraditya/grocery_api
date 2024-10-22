const Order = require('../models/Order');
const User = require('../models/User');

// Assign Delivery Task to a Delivery Partner
exports.assignDelivery = async (req, res) => {
  const { orderId, deliveryPartnerId } = req.body;

  // Find the order and assign the delivery partner
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.deliveryPartner = deliveryPartnerId;
  order.status = 'assigned';
  await order.save();

  res.status(200).json(order);
};

// Get All Deliveries for a Delivery Partner
exports.getDeliveriesByPartner = async (req, res) => {
  const deliveries = await Order.find({ deliveryPartner: req.user._id });
  res.status(200).json(deliveries);
};

// Update Delivery Status by Delivery Partner
exports.updateDeliveryStatus = async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  await order.save();

  res.status(200).json(order);
};

// Track Delivery Status
exports.trackDeliveryStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json({ status: order.status });
};
