const express = require('express');
    const router = express.Router();
    const Cart = require('../models/Cart');
    const Order = require('../models/Order');
    const Snack = require('../models/Snack');
    const User = require('../models/User');
    const { ensureAuthenticated } = require('../middleware/authMiddleware');

    // Place Order
    router.post('/place', ensureAuthenticated, async (req, res) => {
      const userId = req.session.user._id;

      try {
        const cart = await Cart.findOne({ userId }).populate('items.snackId');
        if (!cart || cart.items.length === 0) {
          return res.status(400).send('Cart is empty');
        }

        const orderItems = cart.items.map(item => ({
          snackId: item.snackId._id,
          quantity: item.quantity
        }));

        const newOrder = new Order({
          userId,
          items: orderItems,
          totalPrice: cart.totalPrice,
        });

        await newOrder.save();

        // Add order to user's orders
        const user = await User.findById(userId);
        user.orders.push({ orderId: newOrder._id });
        await user.save();

        // Clear the cart
        await Cart.deleteOne({ userId });

        res.render('thankyou', { user: req.session.user, order: newOrder });

      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    // Get order history
    router.get('/history', ensureAuthenticated, async (req, res) => {
      const userId = req.session.user._id;

      try {
        const user = await User.findById(userId).populate({
          path: 'orders',
          populate: {
            path: 'items.snackId',
            model: 'Snack'
          }
        });

        const orders = user ? user.orders : [];

        res.render('order-history', { user: req.session.user, orders });

      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    module.exports = router;
