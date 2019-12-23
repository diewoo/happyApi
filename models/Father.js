const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FatherSchema = new Schema({
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
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date
  },
  specialOffer: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  },
  line: {
    type: String
  },
  district: {
    type: String
  },
  childs: [
    {
      child: {
        type: Schema.Types.ObjectId,
        ref: 'child'
      },
      names: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});
module.exports = Father = mongoose.model('father', FatherSchema);