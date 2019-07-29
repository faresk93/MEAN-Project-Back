const Recipe = require('../models/recipe');

// create recipe
exports.createRecipe = async (req, res, next) => {
    const body = req.body;
    const recipe = new Recipe({
        title: body.title,
        ingredients: body.ingredients,
        instructions: body.instructions,
        difficulty: body.difficulty,
        time: body.time
    });
    try {
        await recipe.save();
        res.status(201).json(recipe)
        console.log(recipe);
    } catch (error) {
        res.status(400).json({
            error: 'You have error! : ' + error
        })
    }
};

// list all recipes
exports.listRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (e) {
        console.log('Error getting recipes! \n' + e)
    }
};

// get recipe
exports.getRecipe = async (req, res, next) => {
    const id = req.params.id;
    try {
        const recipe = await Recipe.findOne({_id: id});
        res.status(200).json(recipe)
    } catch (error) {
        res.status(404).json({
            error: 'Error! recipe not found: ' + error
        })
    }
};

// update recipe
exports.updateRecipe = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const recipe = new Recipe({
        _id: id,
        title: body.title,
        ingredients: body.ingredients,
        instructions: body.instructions,
        difficulty: body.difficulty,
        time: body.time
    });
    try {
        await Recipe.updateOne({_id: id}, recipe);
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({
            error: 'You have an error! : ' + error
        })
    }
};

// delete recipe
exports.deleteRecipe = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Recipe.deleteOne({_id: id});
        res.status(204).json({message: 'Recipe deleted successfully !'})
    } catch (e) {
        res.status(400).json({
            error: 'You have an error! ' + e
        })
    }
};
