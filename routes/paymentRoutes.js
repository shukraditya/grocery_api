const express = require('express');
const { initiatePayment, verifyPayment, getPaymentHistory } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Payment processing
router.post('/initiate', protect, initiatePayment); // Initiate payment
router.post('/verify', protect, verifyPayment); // Verify payment status

// Payment history
router.get('/history', protect, getPaymentHistory);

module.exports = router;
