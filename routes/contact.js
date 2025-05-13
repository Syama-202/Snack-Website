const express = require('express');
    const router = express.Router();
    const ContactMessage = require('../models/ContactMessage');

    // Contact Us Route
    router.get('/', (req, res) => {
      res.render('contact-us', { message: '', user: req.session.user });
    });

    router.post('/', async (req, res) => {
      const { name, email, message } = req.body;

      try {
        const newMessage = new ContactMessage({ name, email, message });
        await newMessage.save();
        res.render('contact-us', { message: 'Your message has been sent!', user: req.session.user });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
    });

    module.exports = router;
