const express = require('express');
    const router = express.Router();
    const Snack = require('../models/Snack');
    const User = require('../models/User');
    const Cart = require('../models/Cart');
    const { ensureAuthenticated } = require('../middleware/authMiddleware');

    // Add to cart
    router.post('/add/:snackId', ensureAuthenticated, async (req, res) => {
      const snackId = req.params.snackId;
      const userId = req.session.user._id;
      const quantity = parseInt(req.body.quantity) || 1;

      try {
        const snack = await Snack.findById(snackId);
        if (!snack) {
          return res.status(404).send('Snack not found');
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
          cart = new Cart({ userId, items: [{ snackId, quantity }] });
        } else {
          const existingItemIndex = cart.items.findIndex(item => item.snackId.toString() === snackId);
          if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
          } else {
            cart.items.push({ snackId, quantity });
          }
        }

        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + (snack.price * item.quantity);
        }, 0);

        await cart.save();
        res.redirect('/cart');

      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    // View cart
    router.get('/', ensureAuthenticated, async (req, res) => {
      const userId = req.session.user._id;

      try {
        let cart = await Cart.findOne({ userId }).populate('items.snackId');
        if (!cart) {
          cart = { items: [], totalPrice: 0 };
        }
        res.render('cart', { cart, user: req.session.user });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    // Update cart (quantity)
    router.post('/update/:snackId', ensureAuthenticated, async (req, res) => {
      const snackId = req.params.snackId;
      const userId = req.session.user._id;
      const newQuantity = parseInt(req.body.quantity);

      try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
          return res.status(404).send('Cart not found');
        }

        const itemIndex = cart.items.findIndex(item => item.snackId.toString() === snackId);
        if (itemIndex === -1) {
          return res.status(404).send('Item not found in cart');
        }

        if (newQuantity > 0) {
          cart.items[itemIndex].quantity = newQuantity;
        } else {
          cart.items.splice(itemIndex, 1); // Remove item if quantity is 0 or less
        }

        // Recalculate total price
        const snack = await Snack.findById(snackId);
        cart.totalPrice = cart.items.reduce((total, item) => {
          const snackPrice = item.snackId ? item.snackId.price : snack.price;
          return total + (snackPrice * item.quantity);
        }, 0);

        await cart.save();
        res.redirect('/cart');

      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    // Remove from cart
    router.post('/remove/:snackId', ensureAuthenticated, async (req, res) => {
      const snackId = req.params.snackId;
      const userId = req.session.user._id;

      try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
          return res.status(404).send('Cart not found');
        }

        cart.items = cart.items.filter(item => item.snackId.toString() !== snackId);

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
          const snackPrice = item.snackId ? item.snackId.price : 0;
          return total + (snackPrice * item.quantity);
        }, 0);

        await cart.save();
        res.redirect('/cart');

      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    module.exports = router;
