// controllers/userController.js
const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } });  // Fetch all users from the database
        res.json(users);  // Send the list of users as a JSON response
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);  // Delete user by ID
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
