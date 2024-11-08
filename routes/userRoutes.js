// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT'); // JWT authentication middleware
const { getAllUsers, deleteUser } = require('../controllers/userController');

// Get all users (Protected route)
router.get('/users', authenticateJWT, getAllUsers);

// Delete a user (Protected route)
router.delete('/users/:userId', authenticateJWT, deleteUser);

module.exports = router;
