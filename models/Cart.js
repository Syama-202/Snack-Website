const mongoose = require('mongoose');

    const CartSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      items: [{
        snackId: { type: mongoose.Schema.Types.ObjectId, ref: 'Snack' },
        quantity: { type: Number, default: 1 }
      }],
      totalPrice: { type: Number, default: 0 }
    });

    module.exports = mongoose.model('Cart', CartSchema);
