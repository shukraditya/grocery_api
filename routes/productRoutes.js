const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch products and search for products
router.get('/', getProducts);
router.get('/search', searchProducts); // Example: /products/search?query=apple
router.get('/:id', getProductById);

// Admin operations (Protected and restricted to admin)
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
