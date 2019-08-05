const database = require('./database.js');

const express = require('express');

// item routes
const itemRoutes = require('./routes/item');
// user routes
const userRoutes = require('./routes/user');

// bodyParser to make data in request body easily available
const bodyParser = require('body-parser');

// generate static folder paths
const path = require('path');

const app = express();

// connect to MongoDB
database.connect();

// add header for CORS handling
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// JSON body parser middleware
app.use(bodyParser.json());

// Routes implementation
app.use('/api/stuff', itemRoutes);
app.use('/api/auth', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
