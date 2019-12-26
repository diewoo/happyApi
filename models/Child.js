const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const childSchema = new Schema({
  names: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  identityDocumentNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  relative: {
    type: String
  }
});
module.exports = Child = mongoose.model('child', childSchema);