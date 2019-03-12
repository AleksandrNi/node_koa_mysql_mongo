const mongoose = require('../libs/mongoose');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    unique: 'File with the same name has already existed'
  },

  mime: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('File', fileSchema);