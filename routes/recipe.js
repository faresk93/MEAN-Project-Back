const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe');

// Recipes POST middleware
router.post('/', recipeController.createRecipe);

// Recipes GET middleware
router.get('/', recipeController.listRecipes);

// single recipe GET middleware
router.get('/:id', recipeController.getRecipe);

// update recipe middleware
router.put('/:id', recipeController.updateRecipe);

// delete recipe middleware (ASYnc await)
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
