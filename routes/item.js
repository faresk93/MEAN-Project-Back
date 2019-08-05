const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item');

// auth middleware
const auth = require('../middleware/auth');
// file upload middleware (multer)
const multer = require('../middleware/multer-config');

// Items POST middleware
router.post('/', auth, multer, itemController.createItem);

// Items GET middleware
router.get('/', auth, itemController.listItems);

// single item GET middleware
router.get('/:id', auth, itemController.getItem);

// update item middleware
router.put('/:id', auth, multer, itemController.updateItem);

// delete item middleware (ASYnc await)
router.delete('/:id', auth, itemController.deleteItem);

module.exports = router;
