const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');
// Create Schema
const Users = new Schema({
   username:String,
    email: [{type: mongoose.SchemaTypes.Email}],
   password: Number

});

module.exports = Item = mongoose.model('Users', Users);