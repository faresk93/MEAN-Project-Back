// MongoDB password: g5nVA5IVsP8LM8ni
// MongoDB connection: mongodb+srv://faresk93:g5nVA5IVsP8LM8ni@cluster0-anf96.mongodb.net/test?retryWrites=true&w=majority

// allows extra persistence functionalities on top of MongoDB
const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb+srv://faresk93:g5nVA5IVsP8LM8ni@cluster0-anf96.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
        .then(() => {
            console.log('successfully connected to MongoDB Atlas !');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB Atlas !');
            console.error(error);
        })
};

module.exports.mongoose = mongoose;
module.exports.connect = connectDB;
