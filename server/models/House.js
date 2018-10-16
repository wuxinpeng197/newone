const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * House Schema
 */
const HouseSchema = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  address: {
    type: String
  },
  contact: {
    type: String
  },
  type: {
    type: String
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('House', HouseSchema);
