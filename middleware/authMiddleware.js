const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes and ensure user is authenticated
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from the authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify token and decode user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database using the ID from decoded token
      req.user = await User.findById(decoded.id).select('-password'); // Exclude the password from the fetched user

      // If user exists, allow the next middleware or route handler to run
      next();
    } catch (error) {
      console.error('Authorization Error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to ensure the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

// Middleware to ensure the user is a delivery personnel
const deliveryPersonnel = (req, res, next) => {
  if (req.user && req.user.role === 'delivery') {
    next();
  } else {
    res.status(403).json({ message: 'Delivery personnel access required' });
  }
};

module.exports = { protect, admin, deliveryPersonnel };
