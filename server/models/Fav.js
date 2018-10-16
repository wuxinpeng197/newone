const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User - house favorite Schema
 */
const FavSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House'
  }
});

mongoose.model('Fav', FavSchema);
