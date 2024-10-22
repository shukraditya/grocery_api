const express = require('express');
const {
  createOrder,
  getOrderById,
  getOrderHistory,
  trackOrder,
  assignDeliveryPartner,
  updateDeliveryStatus,
  getAllOrders,
  cancelOrder,
} = require('../controllers/orderController');
const { protect, admin, delivery } = require('../middleware/authMiddleware');

const router = express.Router();

// Customer order management
router.post('/checkout', protect, createOrder); // Place an order (checkout)
router.get('/:orderId', protect, getOrderById); // Fetch order details
router.get('/history', protect, getOrderHistory); // Order history for the user

// Order tracking
router.get('/:orderId/track', protect, trackOrder);

// Admin operations
router.post('/:orderId/assign', protect, admin, assignDeliveryPartner); // Assign delivery partner
router.put('/:orderId/cancel', protect, admin, cancelOrder); // Admin cancel order

// Delivery partner updates
router.post('/delivery/update-status', protect, delivery, updateDeliveryStatus); // Delivery partner updates status

// Fetch all orders (admin only)
router.get('/admin/all', protect, admin, getAllOrders);

module.exports = router;
