// models/ToolHistory.js

const mongoose = require('mongoose');

const toolHistorySchema = new mongoose.Schema({
  toolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tool',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  serialNo: {
    type: Number,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['created', 'updated', 'deleted', 'assigned', 'returned'] // Customize as needed
  },
  previousValue: {
    type: Object,
    default: {}
  },
  newValue: {
    type: Object,
    default: {}
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ToolHistory', toolHistorySchema);
