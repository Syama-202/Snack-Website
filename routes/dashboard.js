const express = require('express');
    const router = express.Router();
    const Snack = require('../models/Snack');
    const { ensureAuthenticated } = require('../middleware/authMiddleware');

    // Dashboard Route
    router.get('/', ensureAuthenticated, async (req, res) => {
      try {
        const snacks = await Snack.find();
        res.render('dashboard', { user: req.session.user, snacks });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    // Products Route
    router.get('/products', ensureAuthenticated, async (req, res) => {
      try {
        const snacks = await Snack.find();
        res.render('products', { snacks, user: req.session.user });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    // Track Order Route
    router.get('/track-order', ensureAuthenticated, (req, res) => {
      res.render('track-order', { user: req.session.user });
    });

    // Contact Us Route
    router.get('/contact-us', ensureAuthenticated, (req, res) => {
      res.render('contact-us', { message: '', user: req.session.user });
    });

    // Profile Route
    router.get('/profile', ensureAuthenticated, (req, res) => {
      res.render('profile', { user: req.session.user });
    });

    // Order History Route
    router.get('/order-history', ensureAuthenticated, async (req, res) => {
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
