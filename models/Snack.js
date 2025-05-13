const mongoose = require('mongoose');

    const SnackSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String
      },
      category: {
        type: String,
        enum: ['All Snacks', 'Fried Snacks', 'Baked Snacks', 'Namkeen', 'Sweet Snacks', 'Street Food'],
        default: 'All Snacks'
      },
      badge: {
        type: String
      }
    });

    module.exports = mongoose.model('Snack', SnackSchema);
