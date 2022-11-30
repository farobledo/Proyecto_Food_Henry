const { Router } = require('express');
const { v4: uuidv4 } = require("uuid");
const { Recipe, TypeDiet } = require('../db')
const router = Router();

router.post('/', async (req, res) => {
    let {
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        createdInDb,
        image,
        typeDiets
    } = req.body;

    let data_recipe = await Recipe.create({
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        createdInDb,
        image,
        typeDiets
    })

    try {
        let recipe_create = await Recipe.create({
            id: uuidv4(),
            ...data_recipe
        });

        diets.map(async (e) => {
            let id_diet = await TypeDiet.findAll({ where: { Name: e } });
            await recipe_create.addDiet(id_diet);
        });

        return res.send("Recipe Created");
    } catch (err) {
        console.log("error ", err);
        res.status(404).send("Error created");
    }
});


module.exports = router;