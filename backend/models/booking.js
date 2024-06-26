const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
