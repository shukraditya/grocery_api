const User = require('../models/User');
const Payment = require('../models/Payment');

// Add Payment Method
exports.addPaymentMethod = async (req, res) => {
  const { cardNumber, expiryDate, cvv, cardHolderName } = req.body;

  const paymentMethod = {
    cardNumber,
    expiryDate,
    cvv,
    cardHolderName
  };

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.paymentMethods.push(paymentMethod);
  await user.save();

  res.status(200).json({ message: 'Payment method added successfully', paymentMethods: user.paymentMethods });
};

// Remove Payment Method
exports.removePaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.paymentMethods = user.paymentMethods.filter(
    (method) => method._id.toString() !== paymentMethodId
  );
  await user.save();

  res.status(200).json({ message: 'Payment method removed successfully', paymentMethods: user.paymentMethods });
};

// Process Payment for an Order
exports.processPayment = async (req, res) => {
  const { orderId, paymentMethodId } = req.body;

  // Logic to process payment (e.g., through a third-party API like Stripe)
  // This is a mock logic, assuming success in payment
  const payment = await Payment.create({
    orderId,
    paymentMethodId,
    user: req.user._id,
    status: 'success'
  });

  res.status(200).json({ message: 'Payment processed successfully', payment });
};

// Refund Payment for an Order
exports.refundPayment = async (req, res) => {
  const { paymentId } = req.body;

  const payment = await Payment.findById(paymentId);

  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }

  // Logic to process refund (mocked for this example)
  payment.status = 'refunded';
  await payment.save();

  res.status(200).json({ message: 'Payment refunded successfully', payment });
};
