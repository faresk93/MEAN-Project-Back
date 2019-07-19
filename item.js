const database = require('./database.js');

const itemSchema = database.mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = database.mongoose.model('item', itemSchema);
