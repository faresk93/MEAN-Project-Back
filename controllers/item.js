const Item = require('../models/item');
// file system for file deletion
const fs = require('fs');

// create item
exports.createItem = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const body = JSON.parse(req.body.thing);
    const item = new Item({
        userId: body.userId,
        title: body.title,
        description: body.description,
        imageUrl: url + '/uploads/' + req.file.filename,
        price: body.price
    });
    try {
        await item.save();
        res.status(201).json(item);
        console.log(item);
    } catch (error) {
        res.status(400).json({
            error: 'You have error! : ' + error
        })
    }
};

// list all items
exports.listItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (e) {
        console.log('Error getting items! \n' + e)
    }
};

// get item
exports.getItem = async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await Item.findOne({_id: id});
        res.status(200).json(item)
    } catch (error) {
        res.status(404).json({
            error: 'Error! item not found: ' + error
        })
    }
};

// update item
exports.updateItem = async (req, res, next) => {
    const id = req.params.id;
    let item = new Item({_id: id});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        const body = JSON.parse(req.body.thing);
        item = {
            _id: id,
            userId: body.userId,
            title: body.title,
            description: body.description,
            imageUrl: url + '/uploads/' + req.file.filename,
            price: body.price
        };
    } else {
        const body = req.body;
        item = {
            _id: id,
            userId: body.userId,
            title: body.title,
            description: body.description,
            imageUrl: body.imageUrl,
            price: body.price
        };
    }

    try {
        await Item.updateOne({_id: id}, item);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({
            error: 'You have an error! : ' + error
        })
    }
};

// delete item
exports.deleteItem = async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await Item.findOne({_id: id});
        // delete from server folder
        const filename = item.imageUrl.split('/uploads/')[1];
        fs.unlink('uploads/' + filename, async () => {
            // delete from database
            try {
                await Item.deleteOne({_id: id});
                res.status(204).json({message: 'Item deleted successfully !'})
            } catch (e) {
                res.status(400).json({
                    error: 'You have an error! ' + e
                })
            }
        })

    } catch (e) {
        throw new Error('File not found in server')
    }
};
