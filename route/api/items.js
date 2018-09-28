const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/data');
// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
   Item.find()
       .sort({ date: -1 })
        .then(items => res.json(items));
});
// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        number: req.body.number,
        price: req.body.price,
        selection: req.body.selection,
        text: req.body.text
    });
    newItem.save().then(item => res.json(item));
});
// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});
module.exports = router;