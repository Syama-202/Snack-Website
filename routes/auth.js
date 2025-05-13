const express = require('express');
    const router = express.Router();
    const bcrypt = require('bcryptjs');
    const User = require('../models/User');

    // Signup Route
    router.get('/signup', (req, res) => {
      res.render('signup', { message: '' });
    });

    router.post('/signup', async (req, res) => {
      const { name, email, password } = req.body;

      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.render('signup', { message: 'User already exists' });
        }

        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.redirect('/login');

      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    // Login Route
    router.get('/login', (req, res) => {
      res.render('login', { message: '' });
    });

    router.post('/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.render('login', { message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.render('login', { message: 'Invalid credentials' });
        }

        req.session.user = user;
        res.redirect('/dashboard');

      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    // Logout Route
    router.get('/logout', (req, res) => {
      req.session.destroy(err => {
        if (err) {
          console.error(err);
          return res.redirect('/dashboard');
        }
        res.redirect('/');
      });
    });

    module.exports = router;
