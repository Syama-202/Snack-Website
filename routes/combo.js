const express = require('express');
    const router = express.Router();
    const Combo = require('../models/Combo');
    const Snack = require('../models/Snack');
    const { ensureAuthenticated } = require('../middleware/authMiddleware');

    // Get all combos
    router.get('/', async (req, res) => {
      try {
        const combos = await Combo.find().populate('snacks');
        res.render('combo', { combos, user: req.session.user });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    module.exports = router;
