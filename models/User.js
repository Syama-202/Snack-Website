const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      cart: [{
        snackId: { type: mongoose.Schema.Types.ObjectId, ref: 'Snack' },
        quantity: { type: Number, default: 1 }
      }],
      orders: [{
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
      }]
    });

    module.exports = mongoose.model('User', UserSchema);
