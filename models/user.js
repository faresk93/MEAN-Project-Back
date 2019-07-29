const database = require('../database');
const mongoose = database.mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const User = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);
