const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const initiatePayment = async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });
  res.json({ clientSecret: paymentIntent.client_secret });
};

const verifyPayment = async (req, res) => {
  const { paymentIntentId } = req.body;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  res.json(paymentIntent);
};

module.exports = { initiatePayment, verifyPayment };
