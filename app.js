const database = require('./database.js');

const express = require('express');

// recipe routes
const recipeRoutes = require('./routes/recipe');

// bodyParser to make data in request body easily available
const bodyParser = require('body-parser');


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

app.use('/api/recipes', recipeRoutes);

module.exports = app;
