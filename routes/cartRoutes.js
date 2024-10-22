const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Cart operations
router.post('/add', protect, addToCart);
router.get('/', protect, getCart);
router.delete('/:productId', protect, removeFromCart);

module.exports = router;
