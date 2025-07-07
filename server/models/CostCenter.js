const mongoose = require('mongoose');

const costCentreSchema = new mongoose.Schema({
  name: String,
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
});

module.exports = mongoose.model('CostCentre', costCentreSchema);
