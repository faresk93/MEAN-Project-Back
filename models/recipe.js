const database = require('../database.js');

const Recipe = database.mongoose.Schema({
    title: {type: String, required: true},
    ingredients: {type: String, required: true},
    instructions: {type: String, required: true},
    difficulty: {type: Number, required: true},
    time: {type: Number, required: true}
});

module.exports = database.mongoose.model('recipe', Recipe);
