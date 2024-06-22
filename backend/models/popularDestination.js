const mongoose = require('mongoose');

const PopularDestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  popularityScore: { type: Number, default: 0 }
});

module.exports = mongoose.model('PopularDestination', PopularDestinationSchema);
