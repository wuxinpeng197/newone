const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// use mongoose to connect db
mongoose.connect('mongodb://wxp:19931005wu@ds119750.mlab.com:19750/wxp');

// read all files under `models` folder,
// and require then as mongoose model.
fs.readdirSync(path.join(__dirname, '/models')).forEach(file => {
  require('./models/' + file);
});
