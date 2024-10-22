const User = require('../models/User');

// Get All Users (Admin only)
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

// Get Single User by ID (Admin only)
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

// Update User Role (Admin only)
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    message: 'User role updated successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      paymentMethods: user.paymentMethods
    }
  });
};

// Update User Profile (Admin/User)
exports.updateUserProfile = async (req, res) => {
  const { name, email, phone, address } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  await user.save();

  res.status(200).json({
    message: 'Profile updated successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      paymentMethods: user.paymentMethods
    }
  });
};

// Delete User (Admin only)
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'User deleted successfully' });
};
