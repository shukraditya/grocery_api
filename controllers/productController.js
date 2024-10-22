const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Get product by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Create a new product (admin only)
const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const product = new Product({ name, description, price, category, stock });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Update product details (admin only)
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Delete product (admin only)
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
