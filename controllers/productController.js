const Product = require('../models/Product');

// Get All Products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
};

// Add New Product (Admin only)
exports.addProduct = async (req, res) => {
  const { name, price, stock, description, category } = req.body;

  // Create a new product
  const product = await Product.create({
    name,
    price,
    stock,
    description,
    category
  });

  res.status(201).json(product);
};

// Update Product (Admin only)
exports.updateProduct = async (req, res) => {
  const { name, price, stock, description } = req.body;

  // Find the product by ID and update it
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, price, stock, description },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
};

// Delete Product (Admin only)
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(204).send();
};
