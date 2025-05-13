const mongoose = require('mongoose');

    const ComboSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      snacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Snack' }],
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String
      }
    });

    module.exports = mongoose.model('Combo', ComboSchema);
