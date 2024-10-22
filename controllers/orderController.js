const Order = require('../models/Order');

// Place an Order
exports.placeOrder = async (req, res) => {
  const { products, totalPrice } = req.body;

  // Create a new order
  const order = await Order.create({
    user: req.user._id,
    products,
    totalPrice
  });

  res.status(201).json(order);
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user').populate('products.product');

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json(order);
};

// Track an Order (Check the current status)
exports.trackOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json({ status: order.status });
};

// Assign Delivery Partner (Admin/Manager only)
exports.assignDeliveryPartner = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Assign delivery partner
  order.deliveryPartner = req.body.deliveryPartnerId;
  await order.save();

  res.status(200).json(order);
};

// Update Delivery Status (Admin/Delivery Partner only)
exports.updateDeliveryStatus = async (req, res) => {
  const { orderId, status } = req.body;

  // Find the order and update the status
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  await order.save();

  res.status(200).json(order);
};
