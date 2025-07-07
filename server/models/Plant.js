const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Plant', plantSchema);
