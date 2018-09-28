const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    number: {
        type: Number,
        //required: true
    },
    price: {
        type: Number,
        //required: true
    },
    selection: {
        type: String,
        //required: true
    },
    text: {
        type: String,
        //required: true
    },
    file: {
        type: String,
        //required: true
    }
});
module.exports = Item = mongoose.model('item', ItemSchema);