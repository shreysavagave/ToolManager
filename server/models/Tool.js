const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lifeSpan: {
    type: Number,
    required: true,
  },
  currentAge: {
    type: Number,
    default: 0,
  },
  costCentreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CostCentre',
    required: true,
  },
  notifiedSupervisor: {
    type: Boolean,
    default: false,
  },
  notifiedDevEng: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Make sure 'User' matches your user model name
  }
}, { timestamps: true });

module.exports = mongoose.model('Tool', toolSchema);
