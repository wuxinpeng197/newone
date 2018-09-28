const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//const path = require('path');


const items = require('./route/api/items');
//const auth = require('./route/api/auth');
const app = express();
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);
//app.use('/api/auth', auth);
// Serve static assets if in production

//if (process.env.NODE_ENV === 'production') {

    // Set static folder

    //app.use(express.static('client/build'));



    //app.get('*', (req, res) => {

      //  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    //});

//}


const port = process.env.PORT || 5000;
// Listen to POST requests to /users.
app.listen(port, () => console.log(`Server started on port ${port}`));