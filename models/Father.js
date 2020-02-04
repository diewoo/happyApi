const mongoose = require("mongoose");
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
  fatherRandom: {
    type: String
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
    required: true
  },
  birthday: {
    type: Date
  },
  city: {
    type: String,
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
  contract: {
    type: String
  },
  notAdult: {
    type: Boolean
  },
  lastDate: {
    type: String
  },
  childs: [
    {
      child: {
        type: Schema.Types.ObjectId,
        ref: "child"
      },
      identityDocumentNumber: {
        type: String
      },
      names: {
        type: String
      },
      surname: {
        type: String
      },
      birthday: {
        type: Date
      },
      age: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      relative: {
        type: String
      }
    }
  ]
});
module.exports = Father = mongoose.model("father", FatherSchema);
