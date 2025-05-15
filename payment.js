// routes/payment.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your_stripe_secret_key');
const User = require('../models/User');

router.post('/create-payment-intent', async (req, res) => {
  const { amount, userId } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // in cents
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/confirm-deposit', async (req, res) => {
  const { userId, amount } = req.body;
  
  try {
    const user = await User.findById(userId);
    user.balance += amount;
    user.transactions.push({
      amount,
      type: 'deposit',
      details: { method: 'Stripe' }
    });
    await user.save();
    
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
