const express = require('express');

const app = express();

// 1st middleware
app.use((req, res, next) => {
    console.log('Request received');
    next();
});

// 2nd middleware
app.use((req, res, next) => {
    res.status(201);
    next();
});

// 3rd middleware
app.use((req, res, next) => {
    res.json({
        message: 'This is my first request !'
    });
    next();
});

// 4th middleware
app.use((req, res, next) => {
    console.log('Response sent successfully !');
});

module.exports = app;
