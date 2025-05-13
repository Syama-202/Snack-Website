const express = require('express');
    const router = express.Router();
    const Snack = require('../models/Snack');
    const { ensureAuthenticated } = require('../middleware/authMiddleware');

    // Get all products
    router.get('/', async (req, res) => {
      try {
        const snacks = await Snack.find();
        res.render('products', { snacks, user: req.session.user });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    module.exports = router;
