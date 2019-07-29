const database = require('./database.js');

const express = require('express');

// bodyParser to make data in request body easily available
const bodyParser = require('body-parser');


const app = express();

// connect to MongoDB
database.connect();

// Recipe
const Recipe = require('./models/recipe');

// add header for CORS handling
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// JSON body parser middleware
app.use(bodyParser.json());

// Recipes POST middleware
app.post('/api/recipes', (req, res, next) => {
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
});

// Recipes GET middleware
app.get('/api/recipes', (req, res, next) => {
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
});

// single recipe GET middleware
app.get('/api/recipes/:id', (req, res, next) => {
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
});

// update recipe middleware
app.put('/api/recipes/:id', (req, res, next) => {
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
});

// delete recipe middleware (ASYnc await)
app.delete('/api/recipes/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await Recipe.deleteOne({_id: id});
        res.status(204).json({message: 'Recipe deleted successfully !'})
    } catch (e) {
        res.status(400).json({
            error: 'You have an error! ' + e
        })
    }
});

module.exports = app;
