const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);