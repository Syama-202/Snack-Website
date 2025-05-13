const mongoose = require('mongoose');

    const OrderSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      items: [{
        snackId: { type: mongoose.Schema.Types.ObjectId, ref: 'Snack' },
        quantity: { type: Number, default: 1 }
      }],
      totalPrice: { type: Number, required: true },
      orderDate: { type: Date, default: Date.now },
      status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
    });

    module.exports = mongoose.model('Order', OrderSchema);
