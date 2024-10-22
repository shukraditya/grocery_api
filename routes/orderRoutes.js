const express = require('express');
const { placeOrder, getOrderById, trackOrder, assignDeliveryPartner, updateDeliveryStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/checkout', protect, placeOrder);
router.get('/:id', protect, getOrderById);
router.get('/:id/track', protect, trackOrder);

// Admin routes for delivery management
router.post('/:id/assign', protect, assignDeliveryPartner);
router.post('/delivery/update-status', protect, updateDeliveryStatus);

module.exports = router;
