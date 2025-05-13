const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    require('dotenv').config();

    const app = express();
    const port = process.env.PORT || 3000;

    // Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.use(session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
      }
    }));

    // MongoDB Connection
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    // Models
    const User = require('./models/User');
    const Snack = require('./models/Snack');

    // Routes
    const authRoutes = require('./routes/auth');
    const productRoutes = require('./routes/product');
    const cartRoutes = require('./routes/cart');
    const comboRoutes = require('./routes/combo');
    const contactRoutes = require('./routes/contact');
    const orderRoutes = require('./routes/order');
    const dashboardRoutes = require('./routes/dashboard');

    app.use('/', authRoutes);
    app.use('/products', productRoutes);
    app.use('/cart', cartRoutes);
    app.use('/combo', comboRoutes);
    app.use('/contact', contactRoutes);
    app.use('/order', orderRoutes);
    app.use('/dashboard', dashboardRoutes);

    // Home Route
    app.get('/', (req, res) => {
      res.render('index', { user: req.session.user });
    });

    // Start Server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
