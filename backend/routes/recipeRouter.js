
const Router = require('express')

const recipeRouter = new Router()

const recipeController = require('../controllers/recipeController')

recipeRouter.get("/",recipeController.getRecipes)

recipeRouter.post("/",recipeController.postRecipe)

recipeRouter.get("/like/:id",recipeController.likeRecipe)

recipeRouter.get("/dislike/:id",recipeController.dislikeRecipe)

recipeRouter.get("/wasRecipeLiked/:id",recipeController.wasRecipeLiked)

recipeRouter.get("/:id",recipeController.getRecipe)

recipeRouter.put("/:id",recipeController.editRecipe)

recipeRouter.delete("/:id",recipeController.deleteRecipe)

module.exports = recipeRouter