const mongoose = require('mongoose');

mongoose.connect('mongodb://wxp:19931005wu@ds119750.mlab.com:19750/wxp');

require('./models/User');
require('./models/House');
require('./models/Fav');