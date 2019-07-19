const database = require('./database.js');

const express = require('express')

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

// items POST middleware
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json(req.body);
});

// items GET middleware
app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'strdfbdfbing',
            title: 'First Item',
            description: 'dfgdfhbfd',
            imageUrl: 'http://www.lovethispic.com/uploaded_images/247646-Sleepy-Cat.jpg',
            price: 4900,
            userId: 'hgf,nhgf,'
        },
        {
            _id: 'aa',
            title: 'Second Item',
            description: 'eee',
            imageUrl: 'https://catadoptionteam.org/wp-content/uploads/2019/05/Transparent-OrangeWhiteCat-764x1024.png',
            price: 29,
            userId: 'fhgj,n1,'
        }
    ];
    res.status(200).json(stuff);
});

module.exports = app;
