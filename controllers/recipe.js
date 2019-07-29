const Recipe = require('../models/recipe');

// create recipe
exports.createRecipe = (req, res, next) => {
    const body = req.body;
    const recipe = new Recipe({
        title: body.title,
        ingredients: body.ingredients,
        instructions: body.instructions,
        difficulty: body.difficulty,
        time: body.time
    });
    Recipe.save().then(
        () => {
            res.status(201).json(recipe)
        }).catch(
        (error) => {
            res.status(400).json({
                error: 'You have error! : ' + error
            })
        }
    )
};

// list all recipes
exports.listRecipes = (req, res, next) => {
    Recipe.find().then(
        (recipes) => {
            res.status(200).json(recipes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: 'You have an error! ' + error
            })
        }
    )
};

// get recipe
exports.getRecipe = (req, res, next) => {
    const id = req.params.id;
    Recipe.findOne({
        _id: id
    }).then(
        (recipe) => {
            res.status(200).json(recipe)
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: 'Error! recipe not found: ' + error
            })
        }
    )
};

// update recipe
exports.updateRecipe = (req, res, next) => {
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
    Recipe.updateOne({_id: id}, recipe).then(
        () => {
            res.status(201).json(recipe)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: 'You have an error! : ' + error
            })
        }
    )
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
